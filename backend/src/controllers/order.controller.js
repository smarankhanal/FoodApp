import asyncHandler from "../utlis/asyncHandler.js";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";
import { FoodItem } from "../models/foodItem.model.js";
import { User } from "../models/user.model.js";
import { Order } from "../models/orderItem.model.js";
const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { foodItems } = req.body;

  if (
    !foodItems ||
    !Array.isArray(foodItems) ||
    foodItems.length === 0 ||
    !foodItems.every((item) => item.foodItem && item.quantity > 0)
  ) {
    throw new ApiError(
      400,
      "Fooditems are required and each must have a valid foodItem ID and quantity"
    );
  }

  const foodItemIds = foodItems.map((item) => item.foodItem);
  const validFoodItems = await FoodItem.find({
    _id: { $in: foodItemIds },
  });

  if (validFoodItems.length !== foodItems.length) {
    throw new ApiError(404, "Some food items are invalid");
  }

  const totalPrice = foodItems.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const newOrder = await Order.create({
    user: userId,
    foodItems,
    totalPrice,
  });

  const user = await User.findById(userId);
  user.order = newOrder._id;
  user.purchaseHistory.push(newOrder._id);
  await user.save();

  return res
    .status(200)
    .json(new ApiResponse(200, newOrder, "User order successfully"));
});

const SingleOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.orderId;

  const order = await Order.findOne({ _id: orderId, user: userId }).populate(
    "foodItems.foodItem"
  );
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  const cleanedFoodItems = order.foodItems.filter(
    (item) => item.foodItem !== null
  );
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { ...order.toObject(), foodItems: cleanedFoodItems },
        "Order fetched successfully"
      )
    );
});
const userPurchaseHistory = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const user = await User.findById(userId).populate({
    path: "purchaseHistory",
    options: { sort: { createdAt: -1 } },
    populate: {
      path: "foodItems.foodItem",
      model: "foodItem",
    },
  });

  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        user.purchaseHistory,
        "Purchase History fetched successfully"
      )
    );
});
const cancelUserOrder = asyncHandler(async (req, res) => {
  const orderId = req.params.orderId;
  const userId = req.user._id;
  const order = await Order.findOne({ _id: orderId, user: userId }).populate(
    "foodItems"
  );

  if (!order) {
    throw new ApiError(404, "Order not found for this user");
  }
  if (order.status.toLowerCase() !== "pending") {
    throw new ApiError(400, "Only pending orders can be cancelled");
  }

  order.status = "cancelled";
  await order.save();

  return res
    .status(200)
    .json(new ApiResponse(200, order, "Order cancelled successfully"));
});
export { createOrder, SingleOrder, userPurchaseHistory, cancelUserOrder };
