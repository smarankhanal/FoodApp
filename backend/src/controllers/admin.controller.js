import asyncHandler from "../utlis/asyncHandler.js";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";
import uploadOnCloudinary from "../utlis/cloudinary.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Order } from "../models/orderItem.model.js";
import { FoodItem } from "../models/foodItem.model.js";

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "email or password is required");
  }
  if (
    !(
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    )
  ) {
    throw new ApiError(401, "Unauthorized admin request");
  }
  const token = jwt.sign(
    {
      email,
      role: "admin",
    },
    process.env.ADMIN_ACCESS_TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("accessToken", token, options)
    .json(
      new ApiResponse(
        200,
        { token, email, role: "admin" },
        "Admin login successfully"
      )
    );
});
const updateorderStatusByAdmin = asyncHandler(async (req, res) => {
  const orderStatus = ["pending", "completed", "cancelled"];
  const { status } = req.body;
  const { orderId } = req.params;

  if (!orderStatus.includes(status)) {
    throw new ApiError(400, "Invalid order status");
  }
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  order.status = status;
  await order.save();
  return res
    .status(200)
    .json(
      new ApiResponse(200, order, "Order status successfully changed by admin")
    );
});
const allTheUser = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  return res
    .status(200)
    .json(
      new ApiResponse(200, users, "All the Users are fetched successfullly")
    );
});
const getUserHistory = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const orders = await Order.find({ user: userId })
    .populate("foodItems")
    .sort({ createdAt: -1 });
  if (!orders || orders.length === 0) {
    throw new ApiError(404, "No orders for this user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, orders, "User history fetched successfully"));
});
const uploadFoodItem = asyncHandler(async (req, res) => {
  const { foodName, description, price, type, subCategory } = req.body;
  if (
    [foodName, description, price, type, subCategory].some(
      (field) => typeof field !== "string" || field.trim() === ""
    ) ||
    price === undefined ||
    price === null ||
    isNaN(price)
  ) {
    throw new ApiError(400, "Fooditems information is missing");
  }
  const existFoodItem = await FoodItem.find({ foodName });
  if (!existFoodItem) {
    throw new ApiError(409, "FoodItem already exists");
  }
  // console.log(req.files[0].avatar);
  const foodItemImagePath = req.file?.path;
  if (!foodItemImagePath) {
    throw new ApiError(400, "foodImage file is required");
  }
  const foodImage = await uploadOnCloudinary(foodItemImagePath);
  const foodItem = await FoodItem.create({
    foodName,
    description,
    price,
    type,
    subCategory,
    foodImage: foodImage?.url || "",
  });
  if (!foodItem) {
    throw new ApiError(500, "foodItem creation failed");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, foodItem, "FoodItem created successfully"));
});

const deleteUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  await user.deleteOne();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "User delete successfully"));
});
const adminLogout = asyncHandler(async (req, res) => {
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "Admin logout successfully"));
});
const updateFoodItemDetail = asyncHandler(async (req, res) => {
  const { fooditemId } = req.params;
  const { foodName, description, price, type, subCategory } = req.body;

  const fooditem = await FoodItem.findById(fooditemId);
  if (!fooditem) {
    throw new ApiError(404, "fooditem not found");
  }
  if (req.file?.path && fooditem.foodImage) {
    try {
      await unlinkAsync(fooditem.foodImage);
    } catch (err) {
      throw new ApiError(err.message || "Failed to delete old image");
    }
  }
  fooditem.foodName = foodName || fooditem.foodName;
  fooditem.description = description || fooditem.description;
  fooditem.price = price || fooditem.price;
  fooditem.type = type || fooditem.type;
  fooditem.subCategory = subCategory || fooditem.subCategory;
  fooditem.foodImage = req.file?.path || fooditem.foodImage;
  await fooditem.save();
  return res
    .status(200)
    .json(new ApiResponse(200, fooditem, "Fooditem updated successfully"));
});
export {
  adminLogin,
  updateorderStatusByAdmin,
  uploadFoodItem,
  allTheUser,
  getUserHistory,
  deleteUser,
  adminLogout,
  updateFoodItemDetail,
};
