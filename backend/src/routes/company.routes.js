import { Router } from "express";
import {
  getActiveJobListings,
  getAllApplications,
  getAllJobListings,
  getNonActiveJobListings,
  getShortListedCandidates,
  removeFromApplications,
  removeFromShortlist,
  shortlistCandidate,
} from "../controllers/company.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/listings").get(verifyJWT, getAllJobListings);
router.route("/active-listings").get(verifyJWT, getActiveJobListings);
router.route("/non-active-listings").get(verifyJWT, getNonActiveJobListings);
router.route("/applications").get(verifyJWT, getAllApplications);
router
  .route("/shortlisted-candidates")
  .get(verifyJWT, getShortListedCandidates);

router
  .route("/remove-from-applications")
  .post(verifyJWT, removeFromApplications);

router.route("/shortlist-candidate").post(verifyJWT, shortlistCandidate);
router.route("/remove-from-shortlisted").post(verifyJWT, removeFromShortlist);

export default router;
