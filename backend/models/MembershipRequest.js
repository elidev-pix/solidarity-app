// Path: backend/models/MembershipRequest.js
import mongoose from "mongoose";

const membershipRequestSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        motivation: {
            type: String,
            trim: true,
            default: "",
        },
        status: {
            type: String,
            enum: ["pending", "waitlisted", "accepted", "rejected"],
            default: "pending",
        },
        isWaitlisted: {
            type: Boolean,
            default: false,
        },
        requestedForPeriodStart: {
            type: Date,
        },
        requestedForPeriodEnd: {
            type: Date,
        },
        processedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
        processedAt: {
            type: Date,
            default: null,
        },
        rejectionReason: {
            type: String,
            trim: true,
            default: "",
        },
        createdUser: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },
    },
    { timestamps: true }
);

membershipRequestSchema.index({ status: 1, createdAt: -1 });

export default mongoose.model("MembershipRequest", membershipRequestSchema);