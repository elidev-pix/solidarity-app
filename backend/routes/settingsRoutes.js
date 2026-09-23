// Path: backend/routes/settingsRoutes.js
import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, getSettings);
router.put("/", verifyToken, isAdmin, updateSettings);

export default router;