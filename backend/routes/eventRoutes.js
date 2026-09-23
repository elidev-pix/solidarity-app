// Path: backend/routes/eventRoutes.js
import express from "express";
import {
    createEvent,
    getEvents,
    getEventById,
    updateEvent,
    deleteEvent,
} from "../controllers/eventController.js";
import { verifyToken, isAdmin } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, isAdmin, createEvent);
router.get("/", verifyToken, getEvents);
router.get("/:id", verifyToken, getEventById);
router.put("/:id", verifyToken, isAdmin, updateEvent);
router.delete("/:id", verifyToken, isAdmin, deleteEvent);

export default router;