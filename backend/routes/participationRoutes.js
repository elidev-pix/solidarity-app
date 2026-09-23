// Path: backend/routes/participationRoutes.js
import express from "express";
import {
    registerForEvent,
    markUnavailable,
    getMyParticipations,
    getEventParticipations,
    validateParticipation,
} from "../controllers/participationController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", verifyToken, registerForEvent);
router.post("/unavailable", verifyToken, markUnavailable);
router.get("/me", verifyToken, getMyParticipations);
router.get("/event/:eventId", verifyToken, isAdmin, getEventParticipations);
router.put("/:id/validate", verifyToken, isAdmin, validateParticipation);

export default router;