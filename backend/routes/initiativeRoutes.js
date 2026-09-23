// Path: backend/routes/initiativeRoutes.js
import express from "express";
import {
    createInitiative,
    getMyInitiatives,
    getInitiatives,
    reviewInitiative,
} from "../controllers/initiativeController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createInitiative);
router.get("/me", verifyToken, getMyInitiatives);
router.get("/", verifyToken, isAdmin, getInitiatives);
router.put("/:id/review", verifyToken, isAdmin, reviewInitiative);

export default router;