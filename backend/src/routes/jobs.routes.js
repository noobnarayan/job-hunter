import { Router } from "express";
import {
  applyForJob,
  getCompanies,
  getJobById,
  getJobLocations,
  getJobs,
  ping,
  postJob,
  removeSavedJob,
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
router.route("/remove-saved-job/:id?").post(verifyJWT, removeSavedJob);
router.route("/job-locations").get(getJobLocations);
router.route("/companies").get(getCompanies);

export default router;
