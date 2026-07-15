import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("orderShipment");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const OrderShipmentSchema = new Schema(
    {
      automatOrder: {
        type: Schema.Types.ObjectId,
        ref: "automatOrder",
        required: true,
        unique: true,
      },
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
      user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      customerName: { type: String },
      quantity: { type: Number, required: true, min: 1 },

      // Snapshotted at the moment "Go to Shipment" is clicked, so later
      // payouts (complete/refund) are never affected by the product's
      // price changing afterwards.
      unitPrice: { type: Number, required: true },
      wholesaleAmount: { type: Number, required: true },
      profitAmount: { type: Number, required: true },

      status: {
        type: String,
        enum: ["pending", "completed", "refunded"],
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

  OrderShipmentSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  OrderShipmentSchema.set("toJSON", {
    getters: true,
  });

  OrderShipmentSchema.set("toObject", {
    getters: true,
  });

  return database.model("orderShipment", OrderShipmentSchema);
};
