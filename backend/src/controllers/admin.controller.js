import asyncHandler from "../utlis/asyncHandler.js";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";
import uploadOnCloudinary from "../utlis/cloudinary.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Order } from "../models/orderItem.model.js";
import { FoodItem } from "../models/foodItem.model.js";
import { FoodReview } from "../models/foodreview.model.js";

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
    sameSite: "none",
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
const getAdminProfile = asyncHandler(async (req, res) => {
  const admin = process.env.ADMIN_EMAIL;
  if (!admin) {
    throw new ApiError(404, "Admin is missing");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, admin, "Admin Fetched successfully"));
});

const allTheUser = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password").sort({ createdAt: -1 });
  return res
    .status(200)
    .json(
      new ApiResponse(200, users, "All the Users are fetched successfullly")
    );
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
const getUserHistory = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const orders = await Order.find({ user: userId })
    .populate("foodItems")
    .sort({ createdAt: -1 });
  if (!orders) {
    throw new ApiError(404, "No orders for this user");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, orders, "User history fetched successfully"));
});
const getSingleUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});

const uploadFoodItem = asyncHandler(async (req, res) => {
  const { foodName, description, price, type, subCategory } = req.body;

  if (!foodName || !description || !price || !type || !subCategory) {
    throw new ApiError(400, "Food item information is missing");
  }

  const parsedPrice = Number(price);
  if (isNaN(parsedPrice)) {
    throw new ApiError(400, "Price must be a valid number");
  }

  const existFoodItem = await FoodItem.findOne({ foodName });
  if (existFoodItem) {
    throw new ApiError(409, "FoodItem already exists");
  }

  const foodItemImagePath = req.file?.path;
  if (!foodItemImagePath) {
    throw new ApiError(400, "foodImage file is required");
  }

  const foodImage = await uploadOnCloudinary(foodItemImagePath);
  if (!foodImage || !foodImage.url) {
    throw new ApiError(500, "Image upload failed");
  }

  const foodItem = await FoodItem.create({
    foodName,
    description,
    price: parsedPrice,
    type,
    subCategory,
    foodImage: foodImage.url,
  });

  if (!foodItem) {
    throw new ApiError(500, "Food item creation failed");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, foodItem, "Food item created successfully"));
});

const getAllFoodItem = asyncHandler(async (req, res) => {
  const allFoodItem = await FoodItem.find({}).sort({ createdAt: -1 });
  if (!allFoodItem) {
    throw new ApiError(404, "No order found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, allFoodItem, "All order fetched successfully"));
});
const getSingleFoodItem = asyncHandler(async (req, res) => {
  const foodItemId = req.params.foodItemId;

  const foodItem = await FoodItem.findById(foodItemId);

  if (!foodItem) {
    throw new ApiError(404, "Food item not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, foodItem, "Food item fetched successfully"));
});
const deleteFoodItem = asyncHandler(async (req, res) => {
  const foodItemId = req.params.foodItemId;
  const foodItem = await FoodItem.findById(foodItemId);
  if (!foodItem) {
    throw new ApiError(404, "FoodItem not found");
  }
  await foodItem.deleteOne();
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "FoodItem delete successfully"));
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

const getAllOrder = asyncHandler(async (req, res) => {
  const allOrder = await Order.find({}).sort({ createdAt: -1 });
  if (!allOrder) {
    throw new ApiError(404, "No order found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, allOrder, "All order fetched successfully"));
});
const updateorderStatusByAdmin = asyncHandler(async (req, res) => {
  const orderStatus = ["pending", "completed", "cancelled"];
  const { userId, orderId } = req.params;
  const { status } = req.body;
  if (!orderStatus.includes(status)) {
    throw new ApiError(400, "Invalid order status");
  }
  const order = await Order.findOneAndUpdate(
    { _id: orderId, user: userId },
    { status },
    { new: true }
  );

  if (!order) {
    throw new ApiError(404, "Order not found");
  }
  return res
    .status(200)
    .json(
      new ApiResponse(200, order, "Order status successfully changed by admin")
    );
});
const getSingleOrderbyAdmin = asyncHandler(async (req, res) => {
  const { userId, orderId } = req.params;

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

const getFoodReview = asyncHandler(async (req, res) => {
  const foodItemId = req.params.foodItemId;
  const reviews = await FoodReview.find({ foodItem: foodItemId })
    .populate("user", "fullname")
    .sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, reviews, "Review fetched successfully"));
});
const foodItemReviewByUser = asyncHandler(async (req, res) => {
  const userId = req.params.userId;

  const reviews = await FoodReview.find({ user: userId }).populate(
    "foodItem",
    "foodName description foodImage"
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, reviews, "Reviews by user fetched successfully")
    );
});

export {
  adminLogin,
  adminLogout,
  getAdminProfile,
  allTheUser,
  getUserHistory,
  deleteUser,
  getSingleUser,
  getAllOrder,
  getSingleOrderbyAdmin,
  updateorderStatusByAdmin,
  getAllFoodItem,
  getSingleFoodItem,
  uploadFoodItem,
  updateFoodItemDetail,
  deleteFoodItem,
  getFoodReview,
  foodItemReviewByUser,
};
