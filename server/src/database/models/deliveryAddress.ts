import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("deliveryAddress");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const DeliveryAddressSchema = new Schema(
    {
      address: { type: String, required: true },
      countryCode: { type: String, default: "+1" },
      contactNumber: { type: String, required: true },
      contact: { type: String, required: true },
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
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
    },
    { timestamps: true }
  );

  DeliveryAddressSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  DeliveryAddressSchema.set("toJSON", {
    getters: true,
  });

  DeliveryAddressSchema.set("toObject", {
    getters: true,
  });

  return database.model("deliveryAddress", DeliveryAddressSchema);
};
