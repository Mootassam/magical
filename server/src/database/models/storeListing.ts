import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("storeListing");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const StoreListingSchema = new Schema(
    {
      store: {
        type: Schema.Types.ObjectId,
        ref: "store",
        required: true,
      },
      product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      title: { type: String, required: true },
      image: { type: String },
      salesPrice: { type: Number, required: true },
      wholesalePrice: { type: Number, required: true },
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

  StoreListingSchema.index(
    { store: 1, product: 1, tenant: 1 },
    { unique: true }
  );

  StoreListingSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  StoreListingSchema.set("toJSON", {
    getters: true,
  });

  StoreListingSchema.set("toObject", {
    getters: true,
  });

  return database.model("storeListing", StoreListingSchema);
};
