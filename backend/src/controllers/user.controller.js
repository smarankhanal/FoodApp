import asyncHandler from "../utlis/asyncHandler.js";
import ApiError from "../utlis/ApiError.js";
import ApiResponse from "../utlis/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { FoodItem } from "../models/foodItem.model.js";

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(500, "User generation failed");
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { username, fullname, password, email, address, phoneNumber } =
    req.body;
  if (
    [username, fullname, password, email, address, phoneNumber].some(
      (field) => field?.trim() === ""
    )
  ) {
    throw new ApiError(400, "All field are reuqired");
  }
  const existedUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existedUser) {
    throw new ApiError(409, "User or email alreday exists");
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
    .status(200)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});
const login = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!(username && email)) {
    throw new ApiError(400, "email or username is missing");
  }
  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (!user) {
    throw new ApiError(404, "user doesnot exist");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Unauthorized access");
  }
  const { accessToken, refreshToken } = generateAccessAndRefreshToken(user._id);
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
    req.user_id,
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
const updateAccoutDetails = asyncHandler(async (req, res) => {
  const { fullname, email } = req.body;
  if (!(fullname || email)) {
    throw new ApiError(400, "Full name or email is required");
  }
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullname,
        email,
      },
    },
    {
      new: true,
    }
  ).select("-password");
  return res.status(200).json(200, user, "User deatils updated successfully");
});
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await User.findById(req.user?._id);
  const isPasswordValid = await user.isPasswordCorrect(oldPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid old password");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: false });
  return res
    .status(200)
    .json(new Response(200, "Password changed successfully"));
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
    const user = await User.findById(decoedToken?._id);
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
export {
  registerUser,
  login,
  logout,
  updateAccoutDetails,
  changeCurrentPassword,
  refreshAccessToken,
  getFoodItems,
};
