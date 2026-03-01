import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { viewProfile, editProfile } from "../controllers/profileController.js";

const router = express.Router();

// Routes
router.get("/view", userAuth, viewProfile);
router.patch("/edit", userAuth, editProfile);

export default router;
