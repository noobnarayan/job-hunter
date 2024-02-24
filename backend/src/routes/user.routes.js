import { Router } from "express";
import {
  addSkill,
  authPing,
  getSkills,
  getUserProfile,
  loginUser,
  logoutUser,
  ping,
  registerUser,
  removeSkill,
  updateProfilePicture,
  updateUserProfile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.route("/ping").get(ping);
router.route("/auth-ping").get(verifyJWT, authPing);
router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(verifyJWT, logoutUser);
router.route("/profile").get(verifyJWT, getUserProfile);
router.route("/profile/jobseeker").patch(verifyJWT, updateUserProfile);
router
  .route("/profile-picture")
  .post(verifyJWT, upload.single("profilePicture"), updateProfilePicture);
router.route("/add-skill").post(verifyJWT, addSkill);
router.route("/remove-skill").post(verifyJWT, removeSkill);
router.route("/get-skill").get(verifyJWT, getSkills);

export default router;
