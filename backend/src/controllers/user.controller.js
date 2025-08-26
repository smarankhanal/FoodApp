import asyncHandler from "../utlis/asyncHandler.js";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { FoodItem } from "../models/foodItem.model.js";
import { FoodReview } from "../models/foodreview.model.js";
import { toCaptalizie } from "../utlis/captalizae.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = await user.generateRefreshToken();
    const accessToken = await user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(500, "User generation failed");
  }
};
const registerUser = asyncHandler(async (req, res) => {
  let { username, fullname, email, password, address, phoneNumber } = req.body;
  if (
    [username, fullname, password, email, address, phoneNumber].some(
      (field) => String(field)?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields are reuqired");
  }
  fullname = toCaptalizie(fullname);
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "Username or email already exists");
  }
  const user = await User.create({
    username: username.toLowerCase(),
    fullname,
    password,
    email,
    address,
    phoneNumber,
  });
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new ApiError(500, "User creation failed");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User registered successfully"));
});
const login = asyncHandler(async (req, res) => {
  const { identifier, password } = req.body;
  if (!identifier) {
    throw new ApiError(400, "Email or Username is missing");
  }
  const user = await User.findOne({
    $or: [{ username: identifier }, { email: identifier }],
  });
  if (!user) {
    throw new ApiError(404, "User doesnot exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Unauthorized access");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user.id
  );
  user.refreshToken = refreshToken;
  await user.save();

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User login successfully"
      )
    );
});
const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };
  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User Logout successfully"));
});
const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});
const updateAccoutDetails = asyncHandler(async (req, res) => {
  const { email, username, fullname, phoneNumber, address } =
    req.body.userDetails;
  console.log("Req:-", req.body);
  const updateData = {};
  if (fullname) updateData.fullname = fullname;
  if (email) updateData.email = email;
  if (username) updateData.username = username;
  if (phoneNumber) updateData.phoneNumber = phoneNumber;
  if (address) updateData.address = address;
  console.log(updateData);
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: updateData,
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");
  console.log(user);
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User deatils updated successfully"));
});
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  console.log(req.body);
  console.log("old :", oldPassword, "new :", newPassword);
  const user = await User.findById(req.user?._id);
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid old password");
  }
  user.password = newPassword;
  await user.save();
  return res
    .status(200)
    .json(new Response(200, null, "Password changed successfully"));
});
const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.user?.refreshToken;
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized access");
  }

  try {
    const decoedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    const user = await User.findById(decoedToken?.id);
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    if (incomingRefreshToken !== user.refreshToken) {
      throw new ApiError(401, "Invalid refresh token or refresh token expiry");
    }
    const { accessToken, newRefreshToken } =
      await generateAccessAndRefreshToken(user._id);
    const options = {
      httpOnly: true,
      secure: true,
    };
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "access token  generated successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.messgae || "Invalid refresh token");
  }
});
const getFoodItems = asyncHandler(async (req, res) => {
  const foodItems = await FoodItem.find({});
  return res
    .status(200)
    .json(new ApiResponse(200, foodItems, "foodItems fetched successfully"));
});
const getSingleFoodItem = asyncHandler(async (req, res) => {
  const foodItemId = req.params.foodItemId;
  const foodItem = await FoodItem.findById(foodItemId);
  if (!foodItem) {
    throw new ApiError(404, "FoodItem not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, foodItem, "FoodItem fetched successfully"));
});
const addReview = asyncHandler(async (req, res) => {
  const { review_text, star_rating } = req.body;
  const foodItemId = req.params.foodItemId;
  const userId = req?.user._id;
  console.log(review_text, star_rating, userId);
  console.log(foodItemId);

  const review = new FoodReview({
    user: userId,
    foodItem: foodItemId,
    review_text,
    star_rating,
  });
  if (!review) {
    throw new ApiError(404, "food review missing");
  }
  await review.save();
  return res
    .status(200)
    .json(new ApiResponse(200, review, "Review added successfully"));
});
const getReview = asyncHandler(async (req, res) => {
  const foodItemId = req.params.foodItemId;
  const reviews = await FoodReview.find({ foodItem: foodItemId }).populate(
    "user",
    "fullname"
  );
  if (!reviews || reviews.length === 0) {
    throw new ApiError(404, "No reviews found for this food item");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, reviews, "Review fetched successfully"));
});
export {
  registerUser,
  login,
  logout,
  updateAccoutDetails,
  changeCurrentPassword,
  refreshAccessToken,
  getFoodItems,
  getSingleFoodItem,
  addReview,
  getReview,
  getMe,
};
