import { Router } from "express";
import {
  addSkill,
  authPing,
  getUserProfile,
  loginUser,
  logoutUser,
  ping,
  registerUser,
  removeSkill,
  updateProfilePicture,
  updateResume,
  updateUserProfile,
  userPublicProfile,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { getSavedJobs } from "../controllers/job.controllers.js";

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
router.route("/resume").post(verifyJWT, updateResume);
router.route("/saved-jobs").get(verifyJWT, getSavedJobs);
router.route("/public-profile/:id?").get(userPublicProfile);

export default router;
