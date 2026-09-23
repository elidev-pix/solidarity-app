// Path: backend/controllers/statsController.js
import User from "../models/User.js";
import MembershipRequest from "../models/MembershipRequest.js";
import Participation from "../models/Participation.js";
import Contribution from "../models/Contribution.js";

/** GET /api/stats (admin) - dashboard d'accueil */
export async function getAdminStats(req, res) {
    try {
        const currentYear = new Date().getFullYear();

        const [memberCount, pendingRequests, totalParticipations, contributions] =
            await Promise.all([
                User.countDocuments({ role: "member" }),
                MembershipRequest.countDocuments({ status: "pending" }),
                Participation.countDocuments({ status: "attended" }),
                Contribution.find({ year: currentYear }),
            ]);

        const totalCollected = contributions.reduce((sum, c) => sum + c.amount, 0);

        return res.status(200).json({
            memberCount,
            pendingRequests,
            totalParticipations,
            totalCollected,
            year: currentYear,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}