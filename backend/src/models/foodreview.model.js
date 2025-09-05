import mongoose from "mongoose";
const foodReviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    foodItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "foodItem",
      required: true,
    },
    review_text: {
      type: String,
      required: true,
    },
    star_rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
  },
  { timestamps: true }
);
export const FoodReview = mongoose.model("FoodReview", foodReviewSchema);
