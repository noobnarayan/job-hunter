import { Router } from "express";
import { authPing, getUserProfile, loginUser, logoutUser, ping, registerUser, updateProfilePicture, updateUserProfile } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"


const router = Router()

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/ping").get(ping)
router.route("/auth-ping").get(verifyJWT, authPing)
router.route("/logout").get(verifyJWT, logoutUser)
router.route("/profile").get(verifyJWT, getUserProfile);
router.route("/profile").put(verifyJWT, updateUserProfile);
router.route("/profile-picture").post(verifyJWT, upload.single("profilePicture"), updateProfilePicture);


export default router