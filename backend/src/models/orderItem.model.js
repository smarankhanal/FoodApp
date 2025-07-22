import mongoose from "mongoose";
import { foodItem } from "./foodItem.model";
import { mainModule } from "node:process";
const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodItem",
        required: true,
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
  { timestamp: true },
);
export const Order = mongoose.model("Order", orderSchema);
