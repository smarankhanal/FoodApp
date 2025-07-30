import asyncHandler from "../utlis/asyncHandler/js";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";
import { FoodItem } from "../models/foodItem.model";
import { User } from "../models/user.model.js";
import { Order } from "../models/orderItem.model.js";

const createOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { foodItems } = req.body;
  if (!foodItems || !Array.isArray(foodItems) || foodItems.length === 0) {
    throw new ApiError(400, "Fooditems are request to place a order");
  }
  const validFoodItem = await FoodItem.find({ _id: { $in: foodItems } });
  if (!(validFoodItem.length === foodItems.length)) {
    throw new ApiError(404, "fooditems invalid");
  }
  const totalPrice = validFoodItem.reduce((sum, item) => sum + item.price, 0);
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
const getSingleOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const orderId = req.params.orderId;

  const order = await Order.findOne({ _id: orderId, user: userId }).populate(
    "foodItems"
  );
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  return res.status(200).json(200, order, "Order fefched successfully");
});
const userPurchaseHistory = asyncHandler(async (req, res) => {
  const userId = req.user?._id;
  const user = await User.findById(userId).populate({
    path: "purchaseHistory",
    populate: {
      path: "foodItems",
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
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;

  const validateStatus = ["pending", "completed", "cancelled"];

  if (!validateStatus.includes(status)) {
    throw new ApiError(400, "Invalid status");
  }
  const updateOrder = await Order.findByIdAndUpdate(
    orderId,
    status,
    {
      new: true,
    }.populate("foodItems")
  );
  if (!updateOrder) {
    throw new ApiError(404, "fooditem not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, updateOrder, "Order status updated successfully")
    );
});
export { createOrder, getSingleOrder, userPurchaseHistory, updateOrderStatus };
