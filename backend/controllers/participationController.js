// Path: backend/controllers/participationController.js
import Participation from "../models/Participation.js";
import Event from "../models/Event.js";

/** POST /api/participations/register (membre) - body: { eventId } */
export async function registerForEvent(req, res) {
    try {
        const { eventId } = req.body;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Événement introuvable." });
        }

        const participation = await Participation.findOneAndUpdate(
            { event: eventId, user: req.user.id },
            { status: "registered" },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return res.status(200).json(participation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** POST /api/participations/unavailable (membre) - body: { eventId } */
export async function markUnavailable(req, res) {
    try {
        const { eventId } = req.body;
        const event = await Event.findById(eventId);
        if (!event) {
            return res.status(404).json({ message: "Événement introuvable." });
        }

        const participation = await Participation.findOneAndUpdate(
            { event: eventId, user: req.user.id },
            { status: "unavailable" },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return res.status(200).json(participation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** GET /api/participations/me (membre) */
export async function getMyParticipations(req, res) {
    try {
        const participations = await Participation.find({ user: req.user.id })
            .populate("event")
            .sort({ createdAt: -1 });
        return res.status(200).json(participations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** GET /api/participations/event/:eventId (admin) */
export async function getEventParticipations(req, res) {
    try {
        const participations = await Participation.find({ event: req.params.eventId })
            .populate("user", "memberId fullName");
        return res.status(200).json(participations);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** PUT /api/participations/:id/validate (admin) - body: { status } (attended|absent) */
export async function validateParticipation(req, res) {
    try {
        const { status } = req.body;
        if (!["attended", "absent"].includes(status)) {
            return res.status(400).json({ message: "Statut invalide." });
        }

        const participation = await Participation.findById(req.params.id);
        if (!participation) {
            return res.status(404).json({ message: "Participation introuvable." });
        }

        participation.status = status;
        participation.validatedBy = req.user.id;
        participation.validatedAt = new Date();
        await participation.save();

        return res.status(200).json(participation);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}