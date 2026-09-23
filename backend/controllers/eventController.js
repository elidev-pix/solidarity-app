// Path: backend/controllers/eventController.js
import Event from "../models/Event.js";
import Participation from "../models/Participation.js";

/** POST /api/events (admin) */
export async function createEvent(req, res) {
    try {
        const { title, description, location, startDate, endDate } = req.body;
        if (!title || !startDate) {
            return res.status(400).json({ message: "Titre et date de début requis." });
        }

        const event = await Event.create({
            title,
            description,
            location,
            startDate,
            endDate,
            createdBy: req.user.id,
        });

        return res.status(201).json(event);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** GET /api/events */
export async function getEvents(req, res) {
    try {
        const events = await Event.find().sort({ startDate: 1 });
        return res.status(200).json(events);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** GET /api/events/:id */
export async function getEventById(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Événement introuvable." });
        }
        return res.status(200).json(event);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** PUT /api/events/:id (admin) */
export async function updateEvent(req, res) {
    try {
        const { title, description, location, startDate, endDate, status } = req.body;
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Événement introuvable." });
        }

        if (title !== undefined) event.title = title;
        if (description !== undefined) event.description = description;
        if (location !== undefined) event.location = location;
        if (startDate !== undefined) event.startDate = startDate;
        if (endDate !== undefined) event.endDate = endDate;
        if (status !== undefined) event.status = status;

        await event.save();
        return res.status(200).json(event);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** DELETE /api/events/:id (admin) */
export async function deleteEvent(req, res) {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Événement introuvable." });
        }
        await Participation.deleteMany({ event: event._id });
        await event.deleteOne();
        return res.status(200).json({ message: "Événement supprimé." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}