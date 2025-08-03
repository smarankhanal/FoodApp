import { Router } from "express";
import {
  changeCurrentPassword,
  getFoodItems,
  login,
  logout,
  refreshAccessToken,
  registerUser,
  updateAccoutDetails,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/register-user", registerUser);

router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);
router.route("/account").patch(verifyJWT, updateAccoutDetails);
router.route("/refresh-accessToken").post(refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/food-items").get(verifyJWT, getFoodItems);

export default router;
