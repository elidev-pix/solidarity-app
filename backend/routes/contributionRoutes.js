// Path: backend/routes/contributionRoutes.js
import express from "express";
import {
    createContribution,
    getMyContributions,
    getUserContributions,
    getAllContributions,
} from "../controllers/contributionController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createContribution);
router.get("/me", verifyToken, getMyContributions);
router.get("/user/:userId", verifyToken, isAdmin, getUserContributions);
router.get("/", verifyToken, isAdmin, getAllContributions);

export default router;