// Path: backend/controllers/contributionController.js
import Contribution from "../models/Contribution.js";
import Settings from "../models/Settings.js";
import User from "../models/User.js";

/** POST /api/contributions (admin) */
export async function createContribution(req, res) {
    try {
        const { userId, amount, year, method, note } = req.body;
        if (!userId || !amount || !year) {
            return res.status(400).json({ message: "Membre, montant et année requis." });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Membre introuvable." });
        }

        const contribution = await Contribution.create({
            user: userId,
            amount,
            year,
            method,
            note,
            recordedBy: req.user.id,
        });

        return res.status(201).json(contribution);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** GET /api/contributions/me (membre) - query: ?year= */
export async function getMyContributions(req, res) {
    try {
        const year = Number(req.query.year) || new Date().getFullYear();
        const contributions = await Contribution.find({ user: req.user.id, year }).sort({
            paidAt: -1,
        });
        const settings = await Settings.getSettings();
        const totalPaid = contributions.reduce((sum, c) => sum + c.amount, 0);
        const remaining = Math.max(settings.annualContributionAmount - totalPaid, 0);
        const progress =
            settings.annualContributionAmount > 0
                ? Math.min((totalPaid / settings.annualContributionAmount) * 100, 100)
                : 0;

        return res.status(200).json({
            year,
            annualAmount: settings.annualContributionAmount,
            totalPaid,
            remaining,
            progress,
            history: contributions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** GET /api/contributions/user/:userId (admin) */
export async function getUserContributions(req, res) {
    try {
        const contributions = await Contribution.find({ user: req.params.userId }).sort({
            paidAt: -1,
        });
        return res.status(200).json(contributions);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** GET /api/contributions (admin) - vue globale, query: ?year= */
export async function getAllContributions(req, res) {
    try {
        const year = Number(req.query.year) || new Date().getFullYear();
        const contributions = await Contribution.find({ year })
            .populate("user", "memberId fullName")
            .sort({ paidAt: -1 });
        const totalCollected = contributions.reduce((sum, c) => sum + c.amount, 0);

        return res.status(200).json({ year, totalCollected, contributions });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}