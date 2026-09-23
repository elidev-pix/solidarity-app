// Path: backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import membershipRequestRoutes from "./routes/membershipRequestRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import participationRoutes from "./routes/participationRoutes.js";
import contributionRoutes from "./routes/contributionRoutes.js";
import initiativeRoutes from "./routes/initiativeRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";
import statsRoutes from "./routes/statsRoutes.js";

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/membership-requests", membershipRequestRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/participations", participationRoutes);
app.use("/api/contributions", contributionRoutes);
app.use("/api/initiatives", initiativeRoutes);
app.use("/api/settings", settingsRoutes);
app.use("/api/stats", statsRoutes);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use((err, _req, res, _next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Erreur interne du serveur." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));