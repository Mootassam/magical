import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("automatOrder");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const AutomatOrderSchema = new Schema(
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
      customerName: { type: String, required: true },
      quantity: { type: Number, required: true, min: 1 },
      startTime: { type: Date, required: true },
      status: {
        type: String,
        enum: ["pending", "completed", "rejected"],
        default: "pending",
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

  AutomatOrderSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  AutomatOrderSchema.set("toJSON", {
    getters: true,
  });

  AutomatOrderSchema.set("toObject", {
    getters: true,
  });

  return database.model("automatOrder", AutomatOrderSchema);
};
