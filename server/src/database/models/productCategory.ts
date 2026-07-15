import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("productCategory");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const ProductCategorySchema = new Schema(
    {
      name: {
        type: String,
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

  ProductCategorySchema.index({ name: 1, tenant: 1 }, { unique: true });

  ProductCategorySchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  ProductCategorySchema.set("toJSON", {
    getters: true,
  });

  ProductCategorySchema.set("toObject", {
    getters: true,
  });

  return database.model("productCategory", ProductCategorySchema);
};
