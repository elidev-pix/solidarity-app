import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateMemberId, generateTempPassword } from "../utils/generateCredentials.js";

/** POST /api/users/create */
export async function createUser(req, res) {
    try {
        const { fullName, role = "member" } = req.body;

        if (!fullName?.trim()) {
            return res.status(400).json({ message: "Le nom complet est requis." });
        }
        if (!["admin", "member"].includes(role)) {
            return res.status(400).json({ message: "Rôle invalide." });
        }

        const memberId = generateMemberId();
        const temporaryPassword = generateTempPassword();
        const password = await bcrypt.hash(temporaryPassword, 10);

        const user = await User.create({
            memberId,
            fullName: fullName.trim(),
            password,
            role,
            isFirstLogin: true,
        });

        return res.status(201).json({
            message: "Utilisateur créé avec succès.",
            user,
            temporaryPassword,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** GET /api/users */
export async function getUsers(_req, res) {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}