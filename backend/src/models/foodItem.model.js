import { timeStamp } from "console";
import mongoose from "mongoose";
const foodSchema = new Schema(
  {
    foodName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: [500, "Description can be max 500 characters"],
    },
    price: {
      type: String,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    type: {
      type: String,
      required: true,
      enum: ["veg", "non-veg"],
    },
    subCategory: {
      type: String,
      required: true,
      enum: ["starter", "main course", "dessert", "beverage"],
    },
  },
  { timestamp: true },
);
export const foodItem = mongoose.model("foodItem", foodSchema);
