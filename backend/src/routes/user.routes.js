import { Router } from "express";
import { authPing, getUserProfile, loginUser, logoutUser, ping, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/signup").post(registerUser)
router.route("/login").post(loginUser)
router.route("/ping").get(ping)
router.route("/auth-ping").get(verifyJWT, authPing)
router.route("/logout").get(verifyJWT, logoutUser)
router.route("/profile").get(verifyJWT, getUserProfile);

export default router