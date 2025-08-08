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
} from "../controllers/admin.controller.js";
import { verifyAdminJWT } from "../middlewares/adminAuth.middleware.js";

const router = Router();

router.route("/login").post(adminLogin);
router.route("/logout").post(verifyAdminJWT, adminLogout);
router
  .route("/update-order-status/:orderId")
  .patch(verifyAdminJWT, updateorderStatusByAdmin);
router.route("/all-user").get(verifyAdminJWT, allTheUser);
router.route("/user-history/:userId").get(verifyAdminJWT, getUserHistory);
router.route("/delete-user/:userId").delete(verifyAdminJWT, deleteUser);
router
  .route("/upload-fooditems")
  .post(verifyAdminJWT, upload.single("foodImage"), uploadFoodItem);
router
  .route("/update-fooditem/:fooditemId")
  .patch(verifyAdminJWT, upload.single("FoodItem"), updateFoodItemDetail);
router
  .route("/foodItem/get-review/:foodItemId")
  .get(verifyAdminJWT, getFoodReview);
router
  .route("/user/:userId/food-reviews")
  .get(verifyAdminJWT, foodItemReviewByUser);
export default router;
