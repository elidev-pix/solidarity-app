// Path: backend/models/Contribution.js
import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        amount: {
            type: Number,
            required: true,
            min: 0,
        },
        year: {
            type: Number,
            required: true,
        },
        paidAt: {
            type: Date,
            default: Date.now,
        },
        method: {
            type: String,
            enum: ["especes", "mobile_money", "virement", "autre"],
            default: "especes",
        },
        recordedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        note: {
            type: String,
            trim: true,
            default: "",
        },
    },
    { timestamps: true }
);

contributionSchema.index({ user: 1, year: 1 });

export default mongoose.model("Contribution", contributionSchema);