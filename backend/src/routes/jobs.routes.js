import { Router } from "express";
import {
  applyForJob,
  getJobById,
  getJobs,
  ping,
  postJob,
  saveJob,
  sendJobDescription,
} from "../controllers/job.controllers.js";
import { authPing } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
// Ping routers
router.route("/ping").get(ping);
router.route("/auth-ping").get(verifyJWT, authPing);

//
router.route("/jobs").get(getJobs);
router.route("/jobs/:id?").get(getJobById);
router.route("/jobs").post(verifyJWT, postJob);
router.route("/generate-job-description").post(verifyJWT, sendJobDescription);
router.route("/apply/:id?").post(verifyJWT, applyForJob);
router.route("/save/:id?").post(verifyJWT, saveJob);

export default router;
