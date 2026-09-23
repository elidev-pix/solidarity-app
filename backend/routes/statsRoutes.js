// Path: backend/routes/statsRoutes.js
import express from "express";
import { getAdminStats } from "../controllers/statsController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, isAdmin, getAdminStats);

export default router;