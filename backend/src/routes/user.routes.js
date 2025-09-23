import { Router } from "express";
import {
  changeCurrentPassword,
  getFoodItems,
  login,
  logout,
  refreshAccessToken,
  registerUser,
  updateAccountDetails,
  addReview,
  getReview,
  getMe,
  getSingleFoodItem,
} from "../controllers/user.controller.js";
import {
  createOrder,
  SingleOrder,
  cancelUserOrder,
  userPurchaseHistory,
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  registerValidator,
  updatePasswordValidator,
  updateAccountValidator,
} from "../validators/auth.validators.js";

const router = Router();

// --- Auth & Profile ---
router.route("/me").get(getMe);
router.route("/register-user").post(registerValidator, validate, registerUser);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);

router.route("/refresh-token").post(refreshAccessToken);

// --- Account Management ---
router
  .route("/account")
  .patch(verifyJWT, updateAccountValidator, validate, updateAccountDetails);
router
  .route("/change-password")
  .patch(verifyJWT, updatePasswordValidator, validate, changeCurrentPassword);

// --- Food Items ---
router.route("/food-items").get(verifyJWT, getFoodItems);
router.route("/food-item/:foodItemId").get(verifyJWT, getSingleFoodItem);
router.route("/food-item/:foodItemId/reviews").post(verifyJWT, addReview);
router.route("/food-item/:foodItemId/reviews").get(verifyJWT, getReview);

// --- Orders ---
router.route("/orders").post(verifyJWT, createOrder);
router.route("/orders/:orderId").get(verifyJWT, SingleOrder);
router.route("/orders/:orderId/status").patch(verifyJWT, cancelUserOrder);
router.route("/purchase-history").get(verifyJWT, userPurchaseHistory);

export default router;
