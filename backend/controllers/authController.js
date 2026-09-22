import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signToken(user) {
    return jwt.sign(
        { id: user._id, role: user.role, memberId: user.memberId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "8h" }
    );
}

/** POST /api/auth/login */
export async function login(req, res) {
    try {
        const { memberId, password } = req.body;

        if (!memberId || !password) {
            return res.status(400).json({ message: "memberId et password requis." });
        }

        const user = await User.findOne({ memberId: memberId.toUpperCase() });
        if (!user) {
            return res.status(401).json({ message: "Identifiants incorrects." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Identifiants incorrects." });
        }

        const token = signToken(user);

        return res.status(200).json({
            token,
            user: {
                id: user._id,
                memberId: user.memberId,
                fullName: user.fullName,
                role: user.role,
                isFirstLogin: user.isFirstLogin,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** PUT /api/auth/change-password (protégé) */
export async function changePassword(req, res) {
    try {
        const { oldPassword, newPassword } = req.body;

        if (!oldPassword || !newPassword) {
            return res.status(400).json({ message: "Ancien et nouveau mot de passe requis." });
        }
        if (newPassword.length < 6) {
            return res.status(400).json({ message: "Le nouveau mot de passe doit faire au moins 6 caractères." });
        }

        // req.user vient du middleware verifyToken
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Ancien mot de passe incorrect." });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.isFirstLogin = false;
        // Note : memberId est `immutable` dans le schéma, donc même une tentative
        // volontaire de req.body.memberId ne serait jamais appliquée ici.
        await user.save();

        return res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}