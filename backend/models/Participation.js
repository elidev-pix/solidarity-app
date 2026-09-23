// Path: backend/models/Participation.js
import mongoose from "mongoose";

const participationSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        status: {
            type: String,
            enum: ["registered", "unavailable", "attended", "absent"],
            default: "registered",
        },
        validatedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        validatedAt: {
            type: Date,
            default: null,
        },
    },
    { timestamps: true }
);

participationSchema.index({ event: 1, user: 1 }, { unique: true });

export default mongoose.model("Participation", participationSchema);