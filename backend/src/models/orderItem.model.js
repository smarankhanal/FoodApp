import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodItems: [
      {
        foodItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "foodItem",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "cancelled"],
    },
  },
  { timestamps: true }
);
export const Order = mongoose.model("Order", orderSchema);
