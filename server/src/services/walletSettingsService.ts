import MongooseRepository from "../database/repositories/mongooseRepository";
import WalletSettingsRepository from "../database/repositories/walletSettingsRepository";

const DEFAULT_WALLET_SETTINGS = {
  ethAddress: "",
  ethFee: 0,
  btcAddress: "",
  btcFee: 0,
  usdtTrc20Address: "",
  usdtTrc20Fee: 0,
  usdtErc20Address: "",
  usdtErc20Fee: 0,
};

class WalletSettingsService {
  static async findOrCreateDefault(options) {
    return WalletSettingsRepository.findOrCreateDefault(
      DEFAULT_WALLET_SETTINGS,
      options
    );
  }

  static async save(data, options) {
    const session = await MongooseRepository.createSession(options.database);

    const walletSettings = await WalletSettingsRepository.save(data, options);

    await MongooseRepository.commitTransaction(session);

    return walletSettings;
  }
}

export default WalletSettingsService;
