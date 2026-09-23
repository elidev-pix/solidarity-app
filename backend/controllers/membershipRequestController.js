// Path: backend/controllers/membershipRequestController.js
import MembershipRequest from "../models/MembershipRequest.js";
import Settings from "../models/Settings.js";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateMemberId, generateTempPassword } from "../utils/generateCredentials.js";

/** POST /api/membership-requests (public) */
export async function createRequest(req, res) {
    try {
        const { fullName, email, phone, motivation } = req.body;

        if (!fullName || !email || !phone) {
            return res.status(400).json({ message: "Nom, email et téléphone requis." });
        }

        const settings = await Settings.getSettings();
        const now = new Date();
        const isInPeriod =
            now >= settings.membershipPeriodStart && now <= settings.membershipPeriodEnd;

        const request = await MembershipRequest.create({
            fullName,
            email,
            phone,
            motivation,
            status: isInPeriod ? "pending" : "waitlisted",
            isWaitlisted: !isInPeriod,
            requestedForPeriodStart: settings.membershipPeriodStart,
            requestedForPeriodEnd: settings.membershipPeriodEnd,
        });

        return res.status(201).json({
            message: isInPeriod
                ? "Demande envoyée avec succès."
                : "Hors période d'adhésion : votre demande est en liste d'attente pour la prochaine session.",
            request,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** GET /api/membership-requests (admin) */
export async function getRequests(req, res) {
    try {
        const { status } = req.query;
        const filter = status ? { status } : {};
        const requests = await MembershipRequest.find(filter).sort({ createdAt: -1 });
        return res.status(200).json(requests);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** PUT /api/membership-requests/:id/accept (admin) */
export async function acceptRequest(req, res) {
    try {
        const request = await MembershipRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: "Demande introuvable." });
        }
        if (request.status === "accepted") {
            return res.status(400).json({ message: "Demande déjà acceptée." });
        }

        const memberId = generateMemberId();
        const tempPassword = generateTempPassword();
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const user = await User.create({
            memberId,
            fullName: request.fullName,
            password: hashedPassword,
            role: "member",
            isFirstLogin: true,
        });

        request.status = "accepted";
        request.isWaitlisted = false;
        request.processedBy = req.user.id;
        request.processedAt = new Date();
        request.createdUser = user._id;
        await request.save();

        return res.status(200).json({
            message: "Membre créé avec succès.",
            credentials: {
                memberId: user.memberId,
                tempPassword,
            },
            request,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** PUT /api/membership-requests/:id/reject (admin) */
export async function rejectRequest(req, res) {
    try {
        const { reason } = req.body;
        const request = await MembershipRequest.findById(req.params.id);
        if (!request) {
            return res.status(404).json({ message: "Demande introuvable." });
        }

        request.status = "rejected";
        request.rejectionReason = reason || "";
        request.processedBy = req.user.id;
        request.processedAt = new Date();
        await request.save();

        return res.status(200).json({ message: "Demande rejetée.", request });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}