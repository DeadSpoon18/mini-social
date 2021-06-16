import express from "express";
import { createPost, deleteProfilePost, getAllPost, getMyPost, getPostById, likePost, updatePost } from "../controllers/postController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect,  getAllPost)
router.get("/myPosts", protect,  getMyPost)
router.get("/:id", protect, getPostById)
router.put("/:id", protect, updatePost)
router.put("/:id/likePost", likePost)
router.delete("/:id", deleteProfilePost);

export default router;
