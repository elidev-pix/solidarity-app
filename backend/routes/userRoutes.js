import express from "express";
import { createUser, getUsers } from "../controllers/UserController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, isAdmin, createUser);
router.get("/", verifyToken, isAdmin, getUsers);

export default router;