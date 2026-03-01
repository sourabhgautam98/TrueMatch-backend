import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { createPost, getAllPosts, getMyPosts, deletePost } from "../controllers/postController.js";

const router = express.Router();

// 👉 Routes
router.post("/create", userAuth, createPost);
router.get("/allpost", getAllPosts);
router.get("/myposts", userAuth, getMyPosts);
router.delete("/delete/:id", userAuth, deletePost);

export default router;
