import { Router } from "express";
import { getAllJobListings } from "../controllers/company.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();

router.route("/listings").get(verifyJWT, getAllJobListings);

export default router;
