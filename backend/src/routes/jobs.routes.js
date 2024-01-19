import { Router } from "express";
import { getJobs, ping, postJob } from "../controllers/job.controllers.js";
import { authPing } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
// Ping routers
router.route("/ping").get(ping)
router.route("/auth-ping").get(verifyJWT, authPing)

//
router.route("/jobs").get(getJobs)
router.route("/jobs").post(verifyJWT, postJob)

export default router;