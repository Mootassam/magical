import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("walletSettings");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const WalletSettingsSchema = new Schema(
    {
      ethAddress: { type: String, default: "" },
      ethFee: { type: Number, default: 0 },
      btcAddress: { type: String, default: "" },
      btcFee: { type: Number, default: 0 },
      usdtTrc20Address: { type: String, default: "" },
      usdtTrc20Fee: { type: Number, default: 0 },
      usdtErc20Address: { type: String, default: "" },
      usdtErc20Fee: { type: Number, default: 0 },
      tenant: {
        type: Schema.Types.ObjectId,
        ref: "tenant",
      },
      createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      updatedBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
    { timestamps: true }
  );

  WalletSettingsSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  WalletSettingsSchema.set("toJSON", {
    getters: true,
  });

  WalletSettingsSchema.set("toObject", {
    getters: true,
  });

  return database.model("walletSettings", WalletSettingsSchema);
};
