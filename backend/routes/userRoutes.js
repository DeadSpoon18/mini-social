import express from "express";
import {
  followUser,
  getAllUsers,
  login,
  registerUser,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", registerUser);
router.get("/allUsers", protect, getAllUsers);
router.put("/follow", protect, followUser);

export default router;
