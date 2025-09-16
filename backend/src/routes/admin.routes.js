import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  adminLogin,
  adminLogout,
  allTheUser,
  deleteUser,
  getUserHistory,
  updateFoodItemDetail,
  updateorderStatusByAdmin,
  uploadFoodItem,
  getFoodReview,
  foodItemReviewByUser,
  getAdminProfile,
  getAllOrder,
  getAllFoodItem,
  getSingleUser,
  getSingleOrderbyAdmin,
  getSingleFoodItem,
  deleteFoodItem,
} from "../controllers/admin.controller.js";
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js";

const router = Router();

// --- Authentication ---
router.route("/login").post(adminLogin);
router.route("/get-admin").get(verifyAdminJWT, getAdminProfile);
router.route("/logout").post(verifyAdminJWT, adminLogout);

// --- User Management ---
router.route("/all-users").get(verifyAdminJWT, allTheUser);
router.route("/user/:userId").get(verifyAdminJWT, getSingleUser);
router.route("/user/:userId/history").get(verifyAdminJWT, getUserHistory);
router.route("/user/:userId").delete(verifyAdminJWT, deleteUser);

// --- Food Item Management ---
router.route("/food-items").get(verifyAdminJWT, getAllFoodItem);
router.route("/food-item/:foodItemId").get(verifyAdminJWT, getSingleFoodItem);
router
  .route("/food-item/:foodItemId/delete")
  .delete(verifyAdminJWT, deleteFoodItem);
router
  .route("/food-item/:foodItemId/update")
  .patch(verifyAdminJWT, upload.single("foodImage"), updateFoodItemDetail);
router
  .route("/food-items/upload")
  .post(verifyAdminJWT, upload.single("foodImage"), uploadFoodItem);

// --- Food Reviews ---
router
  .route("/food-item/:foodItemId/reviews")
  .get(verifyAdminJWT, getFoodReview);
router
  .route("/user/:userId/food-reviews")
  .get(verifyAdminJWT, foodItemReviewByUser);

// --- Order Management ---
router.route("/orders").get(verifyAdminJWT, getAllOrder);
router
  .route("/user/:userId/order/:orderId")
  .get(verifyAdminJWT, getSingleOrderbyAdmin);
router
  .route("/user/:userId/order/:orderId/status")
  .patch(verifyAdminJWT, updateorderStatusByAdmin);

export default router;
