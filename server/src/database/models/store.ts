import mongoose from "mongoose";
import FileSchema from "./schemas/fileSchema";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("store");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const StoreSchema = new Schema(
    {
      storeName: { type: String, required: true },
      contact: { type: String },
      idNumber: { type: String },
      mainBusiness: {
        type: String,
        enum: [
          "fashion_clothing",
          "electronics",
          "beauty_cosmetics",
          "home_living",
          "sports_outdoors",
          "toys_hobbies",
          "food_beverages",
          "other",
        ],
      },
      address: { type: String },
      storePhoto: [FileSchema],
      idCardFront: [FileSchema],
      idCardBack: [FileSchema],
      status: {
        type: String,
        enum: ["pending", "rejected", "success"],
        default: "pending",
      },
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

  StoreSchema.index(
    { user: 1, tenant: 1 },
    { unique: true }
  );

  StoreSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  StoreSchema.set("toJSON", {
    getters: true,
  });

  StoreSchema.set("toObject", {
    getters: true,
  });

  return database.model("store", StoreSchema);
};
