import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { sendRequest, reviewRequest } from "../controllers/requestController.js";

const router = express.Router();

// Routes
router.post("/send/:status/:toUserId", userAuth, sendRequest);
router.post("/review/:status/:requestId", userAuth, reviewRequest);

export default router;
