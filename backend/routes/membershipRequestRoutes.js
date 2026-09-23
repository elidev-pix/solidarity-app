// Path: backend/routes/membershipRequestRoutes.js
import express from "express";
import {
    createRequest,
    getRequests,
    acceptRequest,
    rejectRequest,
} from "../controllers/membershipRequestController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", createRequest);
router.get("/", verifyToken, isAdmin, getRequests);
router.put("/:id/accept", verifyToken, isAdmin, acceptRequest);
router.put("/:id/reject", verifyToken, isAdmin, rejectRequest);

export default router;