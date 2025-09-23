import asynchandler from "../utlis/asyncHandler.js";
import ApiError from "../utlis/ApiError.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyJWT = asynchandler(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    if (!token || token === "undefined") {
      throw new ApiError(401, "Access token missing or invalid");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(
      decodedToken?._id || decodedToken?.id
    ).select("-password -refreshToken");

    if (!user) {
      throw new ApiError(401, "Invalid user");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
export { verifyJWT };

// export const verifyJWT = (req, res, next) => {
//   const header = req.headers.authorization;
//   if (!header || !header.startsWith("Bearer ")) {
//     return next(new ApiError(401, "No token provided"));
//   }

//   const token = header.split(" ")[1];
//   try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     next(new ApiError(401, "Invalid or expired token"));
//   }
// };
