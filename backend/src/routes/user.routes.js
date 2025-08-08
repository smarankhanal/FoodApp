import { Router } from "express";
import {
  changeCurrentPassword,
  getFoodItems,
  login,
  logout,
  refreshAccessToken,
  registerUser,
  updateAccoutDetails,
  addReview,
  getReview,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  createOrder,
  getSingleOrder,
  updateOrderStatus,
  userPurchaseHistory,
} from "../controllers/order.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerValidator } from "../validators/auth.validators.js";
const router = Router();

router.route("/register-user").post(registerValidator, validate, registerUser);

router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/account").patch(verifyJWT, updateAccoutDetails);
router.route("/refresh-accessToken").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/food-items").get(verifyJWT, getFoodItems);
router.route("/create-order").post(verifyJWT, createOrder);
router.route("/single-order/:orderId").get(verifyJWT, getSingleOrder);
router.route("/order-status/:orderId").patch(verifyJWT, updateOrderStatus);
router.route("/purchase-history").get(verifyJWT, userPurchaseHistory);
router.route("/foodItem/add-review/:foodItemId").post(verifyJWT, addReview);
router.route("/foodItem/get-review/:foodItemId").get(verifyJWT, getReview);

export default router;
