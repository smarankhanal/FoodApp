import ApiError from "../utlis/ApiError.js";
import asyncHandler from "../utlis/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyAdminJWT = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Admin access token is required");
    }

    const decodedToken = jwt.verify(
      token,
      process.env.ADMIN_ACCESS_TOKEN_SECRET
    );

    if (decodedToken.email !== process.env.ADMIN_EMAIL) {
      throw new ApiError(403, "Access denied. Admins only.");
    }
    req.admin = { email: decodedToken.email };
    return next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid admin access token");
  }
});
