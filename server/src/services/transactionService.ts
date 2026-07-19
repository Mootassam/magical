import Error400 from "../errors/Error400";
import MongooseRepository from "../database/repositories/mongooseRepository";
import { IServiceOptions } from "./IServiceOptions";
import TransactionRepository from "../database/repositories/TransactionRepository";
import Notification from "../database/models/notification";
import AdminPendingCountsService from "./adminPendingCountsService";
import CryptoPriceService from "./cryptoPriceService";
import WalletSettingsService from "./walletSettingsService";

const CRYPTO_WALLETS = ["eth", "btc", "usdt_trc20", "usdt_erc20"];

const WALLET_FEE_FIELDS = {
  eth: "ethFee",
  btc: "btcFee",
  usdt_trc20: "usdtTrc20Fee",
  usdt_erc20: "usdtErc20Fee",
};

function round2(value) {
  return Math.round((Number(value) || 0) * 100) / 100;
}

export default class TransactionService {
  options: IServiceOptions;

  constructor(options) {

    this.options = options;
  }

  async create(data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      // The form always collects the raw amount in whatever coin the user
      // selected (matching the fee, which is always shown/configured in
      // that same coin) - never USD directly. Convert it to its USDT/USD
      // equivalent here, server-side, using a freshly fetched rate, before
      // any balance check/mutation - never trust a client-supplied rate for
      // something that moves balance.
      let amount = data.amount;
      let coinAmount = null;
      let exchangeRate = null;
      let feeAmount = null;

      if (data.type === "deposit" && CRYPTO_WALLETS.includes(data.wallet)) {
        coinAmount = data.amount;
        exchangeRate = await CryptoPriceService.getRateForWallet(data.wallet);
        amount = String(round2(Number(data.amount) * exchangeRate));
      }

      // For withdrawals, `data.amount` is the coin quantity the customer
      // wants to withdraw. The network fee - fetched fresh from the
      // tenant's own wallet settings, never trusted from the client - is in
      // that same coin, so it's subtracted directly (no rate needed for
      // that part) to get `coinAmount`, the net amount actually sent. The
      // full requested coin amount is then converted to its USD-equivalent
      // to become `amount`, which is what's deducted from balance below -
      // i.e. the fee comes out of what's sent, not on top of what's charged.
      if (data.type === "withdraw" && CRYPTO_WALLETS.includes(data.wallet)) {
        exchangeRate = await CryptoPriceService.getRateForWallet(data.wallet);

        const walletSettings = await WalletSettingsService.findOrCreateDefault(
          { ...this.options, session }
        );
        const feeCoin =
          Number(walletSettings?.[WALLET_FEE_FIELDS[data.wallet]]) || 0;

        const requestedCoin = Number(data.amount) || 0;
        const netCoin = round2(requestedCoin - feeCoin);

        if (netCoin <= 0) {
          throw new Error400(
            this.options.language,
            "validation.withdrawalBelowFee"
          );
        }

        feeAmount = round2(feeCoin * exchangeRate);
        coinAmount = String(netCoin);
        amount = String(round2(requestedCoin * exchangeRate));
      }

      await this.checkSolde({ ...data, amount }, { ...this.options });

      const values = {
        status: data.status,
        datetransaction: data.datetransaction,
        user: data.user,
        type: data.type,
        amount,
        coinAmount,
        exchangeRate,
        feeAmount,
        photo: data.photo,
        wallet: data.wallet || null,
        walletAddress: data.walletAddress || null,
      };

      const record = await TransactionRepository.create(values, {
        ...this.options,
        session,
      });

      // For deposit transactions, create deposit_success notification
      if (data.type === 'deposit') {
        await this.updateUserBalance(data.user, amount, session, 'inc');

        await this.createNotification(
          data.user,
          record._id,
          'deposit_success', // Changed to deposit_success
          amount,
          { ...this.options, session }
        );
      }

      // For withdrawal transactions, deduct balance but DON'T create notification
      if (data.type === 'withdraw') {
        await this.updateUserBalance(data.user, amount, session, 'dec');
        // No notification created for withdrawal on creation
      }

      await MongooseRepository.commitTransaction(session);

      this._notifyPendingCountsChanged();

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "mandat"
      );

      throw error;
    }
  }

  // Fire-and-forget - the header badge counts are a nice-to-have real-time
  // signal, not something worth delaying the API response for.
  _notifyPendingCountsChanged() {
    const currentTenant = MongooseRepository.getCurrentTenant(this.options);

    AdminPendingCountsService.computeAndEmit(
      currentTenant.id,
      this.options.database
    ).catch(() => {});
  }

  async updateUserBalance(userId, amount, session, operation = 'inc') {
    const User = this.options.database.model('user');
    const update = operation === 'inc'
      ? { $inc: { balance: parseFloat(amount) } }
      : { $inc: { balance: -parseFloat(amount) } };

    await User.findByIdAndUpdate(userId, update, { session });
  }

  async createNotification(userId, transactionId, type, amount, options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    const currentTenant = MongooseRepository.getCurrentTenant(options);

    await Notification(options.database).create([{
      type, // Now using the type directly (deposit_success, withdraw_success, etc.)
      status: 'unread',
      user: userId,
      transaction: transactionId,
      amount: amount.toString(),
      tenant: currentTenant.id,
      createdBy: currentUser.id,
    }], options);
  }

  async checkSolde(data, options) {
    const currentUser = MongooseRepository.getCurrentUser(options);

    if (!data) {
      throw new Error400(options.language, "validation.requiredAmount");
    }
    const amount = data.amount;
    const type = data.type;

    if (type === "withdraw") {

      if (!data.wallet || !data.walletAddress) {

        throw new Error400(options.language, "validation.missingWalletAddress");

      }


      if (currentUser.withdrawPassword == data.withdrawPassword) {
        if (currentUser.balance < amount) {

          throw new Error400(options.language, "validation.exceedsBalance");

        }
      } else {

        throw new Error400(options.language, "validation.inValidWithdrawPassword");

      }
    }
  }

  async updateTransactionStatus(transactionId, newStatus, options) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const Transaction = this.options.database.model('transaction');
      const User = this.options.database.model('user');

      // Find the transaction with user data
      const transaction = await Transaction.findById(transactionId)
        .populate('user')
        .session(session);

      if (!transaction) {
        throw new Error400(
          this.options.language,
          "Transaction.notFoundTransaction"
        );
      }

      const oldStatus = transaction.status;
      const amount = parseFloat(transaction.amount);

      // Update transaction status
      const updatedTransaction = await Transaction.findByIdAndUpdate(
        transactionId,
        {
          status: newStatus,
          updatedBy: MongooseRepository.getCurrentUser(options).id
        },
        { new: true, session }
      );

      // Create notification based on transaction type and new status
      if (transaction.type === 'withdraw' && newStatus === 'success') {
        // Only create withdraw_success notification for successful withdrawals
        await this.createNotification(
          transaction.user._id,
          transactionId,
          'withdraw_success', // Created only when withdrawal is successful
          transaction.amount,
          { ...this.options, session }
        );
      } else if (transaction.type === 'withdraw' && newStatus === 'canceled') {
        // Create withdraw_canceled notification for canceled withdrawals
        await this.createNotification(
          transaction.user._id,
          transactionId,
          'withdraw_canceled',
          transaction.amount,
          { ...this.options, session }
        );
      } else if (transaction.type === 'deposit' && newStatus === 'canceled') {
        // Create deposit_canceled notification for canceled deposits
        await this.createNotification(
          transaction.user._id,
          transactionId,
          'deposit_canceled',
          transaction.amount,
          { ...this.options, session }
        );
      }
      // Note: deposit_success is already created in the create method

      // Handle withdrawal transactions - only return money if canceled
      if (transaction.type === 'withdraw') {
        // Case: Status changed to 'canceled' - return the amount
        if (newStatus === 'canceled') {
          await User.findByIdAndUpdate(
            transaction.user._id,
            { $inc: { balance: amount } },
            { session }
          );
        }

        // Case: Status changed from 'canceled' to 'success' - deduct again
        else if (oldStatus === 'canceled' && newStatus === 'success') {
          await User.findByIdAndUpdate(
            transaction.user._id,
            { $inc: { balance: -amount } },
            { session }
          );
        }
      }

      await MongooseRepository.commitTransaction(session);

      this._notifyPendingCountsChanged();

      return updatedTransaction;

    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async checkpermission(options) {
    const currentUser = MongooseRepository.getCurrentUser(options);
    if (currentUser.withdraw) return;

    throw new Error400(
      this.options.language,
      "validation.permissoin"
    );
  }

  async update(id, data) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      const record = await TransactionRepository.update(id, data, {
        ...this.options,
        session,
      });

      await MongooseRepository.commitTransaction(session);

      this._notifyPendingCountsChanged();

      return record;
    } catch (error) {
      await MongooseRepository.abortTransaction(session);

      MongooseRepository.handleUniqueFieldError(
        error,
        this.options.language,
        "mandat"
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const session = await MongooseRepository.createSession(
      this.options.database
    );

    try {
      for (const id of ids) {
        await TransactionRepository.destroy(id, {
          ...this.options,
          session,
        });
      }

      await MongooseRepository.commitTransaction(session);
    } catch (error) {
      await MongooseRepository.abortTransaction(session);
      throw error;
    }
  }

  async findById(id) {
    return TransactionRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return TransactionRepository.findAllAutocomplete(
      search,
      limit,
      this.options
    );
  }

  async findAndCountAll(args) {
    return TransactionRepository.findAndCountAll(args, this.options);
  }

  async findAndCountByUser(args) {
    return TransactionRepository.findAndCountByUser(args, this.options);
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        "importer.errors.importHashRequired"
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        "importer.errors.importHashExistent"
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await TransactionRepository.count(
      {
        importHash,
      },
      this.options
    );

    return count > 0;
  }
}