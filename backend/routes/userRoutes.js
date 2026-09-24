// Path: backend/routes/userRoutes.js
import express from "express";
import { createUser, getUsers, resetPassword, bulkCreate, updateMe } from "../controllers/UserController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, isAdmin, createUser);
router.get("/", verifyToken, isAdmin, getUsers);
router.put("/:id/reset-password", verifyToken, isAdmin, resetPassword);
router.post("/bulk-create", verifyToken, isAdmin, bulkCreate);
router.put("/me", verifyToken, updateMe);

export default router;