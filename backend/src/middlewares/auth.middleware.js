import asynchandler from "../utlis/asyncHandler.js";
import ApiError from "../utlis/ApiError.js";
import { User } from "../models/user.model.js";
const verifyJWT = asynchandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("breaer", "");
    if (!token) {
      throw new ApiError(401, "Invalid accessToken");
    }
    const decodedToken = jwt.verify(token.process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?.id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid user");
    }
    req.user = user;
    return next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
export { verifyJWT };
