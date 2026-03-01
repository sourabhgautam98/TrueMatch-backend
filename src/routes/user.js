import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { getReceivedRequests, getConnections, getFeed } from "../controllers/userController.js";

const router = express.Router();

// Routes
router.get("/requests/received", userAuth, getReceivedRequests);
router.get("/connections", userAuth, getConnections);
router.get("/feed", userAuth, getFeed);

export default router;
