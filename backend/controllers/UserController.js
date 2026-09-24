// Path: backend/controllers/userController.js
import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateMemberId, generateTempPassword } from "../utils/generateCredentials.js";

export async function createUser(req, res) {
    try {
        const { fullName, role } = req.body;
        if (!fullName) return res.status(400).json({ message: "Nom complet requis." });

        const memberId = generateMemberId();
        const tempPassword = generateTempPassword();
        const hashedPassword = await bcrypt.hash(tempPassword, 10);

        const user = await User.create({
            memberId,
            fullName,
            password: hashedPassword,
            role: role === "admin" ? "admin" : "member",
            isFirstLogin: true,
        });

        return res.status(201).json({ user, credentials: { memberId: user.memberId, tempPassword } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

export async function getUsers(req, res) {
    try {
        const users = await User.find({ role: "member" }).sort({ createdAt: -1 });
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

export async function resetPassword(req, res) {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: "Membre introuvable." });

        const tempPassword = generateTempPassword();
        user.password = await bcrypt.hash(tempPassword, 10);
        user.isFirstLogin = true;
        await user.save();

        return res.status(200).json({ credentials: { memberId: user.memberId, tempPassword } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

export async function bulkCreate(req, res) {
    try {
        const { members } = req.body;
        if (!Array.isArray(members) || members.length === 0) {
            return res.status(400).json({ message: "Liste de membres requise." });
        }

        const results = [];
        for (const m of members) {
            if (!m.fullName) continue;
            const memberId = generateMemberId();
            const tempPassword = generateTempPassword();
            const hashedPassword = await bcrypt.hash(tempPassword, 10);
            const user = await User.create({
                memberId,
                fullName: m.fullName,
                password: hashedPassword,
                role: "member",
                isFirstLogin: true,
            });
            results.push({ fullName: user.fullName, memberId: user.memberId, tempPassword });
        }

        return res.status(201).json({ created: results });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

export async function updateMe(req, res) {
    try {
        const { fullName } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "Utilisateur introuvable." });

        if (fullName !== undefined) user.fullName = fullName;
        await user.save();

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}