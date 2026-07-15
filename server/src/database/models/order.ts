import mongoose from "mongoose";
const Schema = mongoose.Schema;

export default (database) => {
  try {
    return database.model("order");
  } catch (error) {
    // continue, because model doesnt exist
  }

  const OrderItemSchema = new Schema(
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
      },
      title: { type: String, required: true },
      image: { type: String },
      price: { type: Number, required: true },
      qty: { type: Number, required: true, min: 1 },
    },
    { _id: false }
  );

  const OrderSchema = new Schema(
    {
      items: {
        type: [OrderItemSchema],
        required: true,
        validate: (value) => Array.isArray(value) && value.length > 0,
      },

      totalAmount: {
        type: Number,
        required: true,
      },

      paymentMethod: {
        type: String,
        enum: ["cod"],
        default: "cod",
      },

      status: {
        type: String,
        enum: ["pending", "confirmed", "shipped", "delivered", "cancelled"],
        default: "pending",
      },

      deliveryAddress: {
        address: { type: String, required: true },
        countryCode: { type: String, default: "+1" },
        contactNumber: { type: String, required: true },
        contact: { type: String, required: true },
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

  OrderSchema.virtual("id").get(function () {
    // @ts-ignore
    return this._id.toHexString();
  });

  OrderSchema.set("toJSON", {
    getters: true,
  });

  OrderSchema.set("toObject", {
    getters: true,
  });

  return database.model("order", OrderSchema);
};
