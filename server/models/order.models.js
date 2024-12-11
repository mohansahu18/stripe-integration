import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderdBy: {
      type: String,
    },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

    TotalAmount: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
