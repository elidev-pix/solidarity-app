import jwt from "jsonwebtoken";

/** Vérifie que le token JWT envoyé dans le header Authorization est valide */
export function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token manquant." });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role, memberId }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalide ou expiré." });
    }
}

/** À utiliser APRÈS verifyToken : bloque les non-admins */
export function isAdmin(req, res, next) {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ message: "Accès réservé aux administrateurs." });
    }
    next();
}