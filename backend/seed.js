// backend/seed.js
// Comme il n'y a pas d'inscription publique, ce script sert UNE FOIS à créer
// le tout premier compte admin (aucun endpoint ne peut le faire, puisque
// POST /api/users/create exige déjà d'être admin — problème de l'œuf et la poule).
//
// Usage : node seed.js

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import { generateMemberId } from "./utils/generateCredentials.js";
import mongoose from "mongoose";

dotenv.config();

async function seedAdmin() {
    await connectDB();

    const existingAdmin = await User.findOne({ role: "admin" });
    if (existingAdmin) {
        console.log(`⚠️  Un admin existe déjà : ${existingAdmin.memberId}`);
        process.exit(0);
    }

    const memberId = generateMemberId();
    const plainPassword = "Admin123!"; // ⚠️ à changer immédiatement après le premier login

    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    const admin = await User.create({
        memberId,
        fullName: "Administrateur principal",
        password: hashedPassword,
        role: "admin",
        isFirstLogin: true,
    });

    console.log("✅ Admin créé :");
    console.log(`   memberId : ${admin.memberId}`);
    console.log(`   password : ${plainPassword}`);
    console.log("   → Connecte-toi puis change ce mot de passe immédiatement.");

    await mongoose.disconnect();
    process.exit(0);
}

seedAdmin().catch((err) => {
    console.error(err);
    process.exit(1);
});