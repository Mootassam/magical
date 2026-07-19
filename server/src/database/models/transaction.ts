import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("transaction");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const TransactionSchema = new Schema(
    {
      status: {
        type: String,
        enum: ["pending", "canceled", "success"],
        default: "pending",
      },
      amount: {
        type: String,
      },
      // Raw amount in the deposit's own coin (e.g. "0.005" for a BTC
      // deposit) - `amount` above is always the USDT/USD-equivalent value
      // that gets credited to the user's balance.
      coinAmount: {
        type: String,
        default: null,
      },
      // USD rate per 1 unit of the coin, captured at submission time so the
      // record stays accurate even if the market rate moves later.
      exchangeRate: {
        type: Number,
        default: null,
      },
      // Withdrawals only: the network fee (in USD/USDT terms, converted from
      // the wallet setting's coin-denominated fee at submission time) that
      // was subtracted from `amount` before arriving at `coinAmount`, the
      // net amount actually sent to the customer.
      feeAmount: {
        type: Number,
        default: null,
      },
      type: {
        type: String,
        enum: ["withdraw", "deposit"],
        default: "withdraw",
      },
      wallet: {
        type: String,
        enum: ["eth", "btc", "usdt_trc20", "usdt_erc20", null],
        default: null,
      },
      walletAddress: {
        type: String,
        default: null,
      },
      photo: [FileSchema],
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      datetransaction: {
        type: Date,
      },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
        required: true,
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      importHash: { type: String },
    },
    { timestamps: true }
  );

  TransactionSchema.index(
    { importHash: 1, tenant: 1 },
    {
      unique: true,
      partialFilterExpression: {
        importHash: { $type: "string" },
      },
    }
  );

  TransactionSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  TransactionSchema.set("toJSON", {
    getters: true,
  });

  TransactionSchema.set("toObject", {
    getters: true,
  });

  return database.model("transaction", TransactionSchema);
};
