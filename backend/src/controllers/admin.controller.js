import asyncHandler from "../utlis/asyncHandler";
import ApiError from "../utlis/ApiError";
import ApiResponse from "../utlis/ApiResponse";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model";
import { Order } from "../models/orderItem.model";

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
  return res
    .status(200)
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
    .json(200, order, "Order status successfully changed by admin");
});
export { adminLogin, updateorderStatusByAdmin };
