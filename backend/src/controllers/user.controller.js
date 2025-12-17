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
    throw new ApiError(401, "Unauthoriozed");
  }
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user.id
  );
  user.refreshToken = refreshToken;
  user.isActive = true;
  await user.save({ validateBeforeSave: false });
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const isProduction = process.env.NODE_ENV === "production";

  const options = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "none",
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
  const user = await User.findByIdAndUpdate(
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
  console.log(user);
  user.isActive = false;
  await user.save();
  const isProduction = process.env.NODE_ENV === "production";
  const options = {
    httpOnly: true,
    secure: isProduction,
    sameSite: "none",
  };
  return res
    .status(200)
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .json(new ApiResponse(200, {}, "User Logout successfully"));
});
// const logout = asyncHandler(async (req, res) => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res.status(200).json(new ApiResponse(200, {}, "Already logged out"));
//   }

//   const refreshToken = authHeader.split(" ")[1];

//   await User.findOneAndUpdate(
//     { refreshToken },
//     {
//       $unset: { refreshToken: 1 },
//       $set: { isActive: false },
//     }
//   );

//   return res
//     .status(200)
//     .json(new ApiResponse(200, {}, "User logout successfully"));
// });

const getMe = asyncHandler(async (req, res) => {
  console.log(req.user);
  if (!req.user) {
    throw new ApiError(404, "User not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, req.user, "User fetched successfully"));
});
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { email, username, fullname, phoneNumber, address } = req.body;
  const updateData = {};
  if (fullname) updateData.fullname = fullname;
  if (email) updateData.email = email;
  if (username) updateData.username = username;
  if (phoneNumber) updateData.phoneNumber = phoneNumber;
  if (address) updateData.address = address;
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: updateData,
    },
    {
      new: true,
    }
  ).select("-password -refreshToken");
  return res
    .status(200)
    .json(new ApiResponse(200, user, "User deatils updated successfully"));
});
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
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
// const refreshAccessToken = asyncHandler(async (req, res) => {
//   const incomingRefreshToken =
//     req.cookies?.refreshToken || req.user?.refreshToken;

//   if (!incomingRefreshToken) {
//     throw new ApiError(401, "Unauthorized access - no refresh token");
//   }

//   try {
//     const decodedToken = jwt.verify(
//       incomingRefreshToken,
//       process.env.REFRESH_TOKEN_SECRET
//     );

//     const user = await User.findById(decodedToken?.id);
//     if (!user) {
//       throw new ApiError(401, "Invalid refresh token");
//     }

//     if (incomingRefreshToken !== user.refreshToken) {
//       throw new ApiError(401, "Refresh token mismatch or expired");
//     }

//     const { accessToken, newRefreshToken } =
//       await generateAccessAndRefreshToken(user._id);

//     const options = {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//     };

//     return res
//       .status(200)
//       .cookie("accessToken", accessToken, options)
//       .cookie("refreshToken", newRefreshToken, options)
//       .json(
//         new ApiResponse(
//           200,
//           { accessToken, refreshToken: newRefreshToken },
//           "Access token refreshed successfully"
//         )
//       );
//   } catch (error) {
//     throw new ApiError(401, error?.message || "Invalid refresh token");
//   }
// });

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
  updateAccountDetails,
  changeCurrentPassword,
  // refreshAccessToken,
  getFoodItems,
  getSingleFoodItem,
  addReview,
  getReview,
  getMe,
};
