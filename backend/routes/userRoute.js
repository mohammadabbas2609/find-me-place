import express from "express";
import {
  forgotPassword,
  getMyProfile,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword,
  updateMyProfile,
} from "../controllers/userController.js";
import verifyUser from "../middlewares/verifyUser.js";

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(verifyUser, logoutUser);

router.route("/myprofile").get(verifyUser, getMyProfile);

router.route("/updateprofile").put(verifyUser, updateMyProfile);

router.route("/forgotpassword").post(forgotPassword);

router.route("/resetpassword/:resettoken").put(resetPassword);

export default router;
