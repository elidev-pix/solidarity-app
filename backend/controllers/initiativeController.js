// Path: backend/controllers/initiativeController.js
import Initiative from "../models/Initiative.js";

/** POST /api/initiatives (membre) */
export async function createInitiative(req, res) {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({ message: "Titre et description requis." });
        }

        const initiative = await Initiative.create({
            title,
            description,
            proposedBy: req.user.id,
        });

        return res.status(201).json(initiative);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** GET /api/initiatives/me (membre) */
export async function getMyInitiatives(req, res) {
    try {
        const initiatives = await Initiative.find({ proposedBy: req.user.id }).sort({
            createdAt: -1,
        });
        return res.status(200).json(initiatives);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** GET /api/initiatives (admin) - query: ?status= */
export async function getInitiatives(req, res) {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        const initiatives = await Initiative.find(filter)
            .populate("proposedBy", "memberId fullName")
            .sort({ createdAt: -1 });
        return res.status(200).json(initiatives);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** PUT /api/initiatives/:id/review (admin) - body: { status, rejectionReason } */
export async function reviewInitiative(req, res) {
    try {
        const { status, rejectionReason } = req.body;
        if (!["approved", "rejected"].includes(status)) {
            return res.status(400).json({ message: "Statut invalide." });
        }

        const initiative = await Initiative.findById(req.params.id);
        if (!initiative) {
            return res.status(404).json({ message: "Initiative introuvable." });
        }

        initiative.status = status;
        initiative.rejectionReason = status === "rejected" ? rejectionReason || "" : "";
        initiative.reviewedBy = req.user.id;
        initiative.reviewedAt = new Date();
        await initiative.save();

        return res.status(200).json(initiative);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}