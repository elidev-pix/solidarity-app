// backend/models/Settings.js
import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
    {
        singleton: {
            type: String,
            default: "main",
            unique: true,
            immutable: true,
        },
        membershipPeriodStart: {
            type: Date,
            required: true,
        },
        membershipPeriodEnd: {
            type: Date,
            required: true,
        },
        annualContributionAmount: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { timestamps: true }
);

settingsSchema.statics.getSettings = async function () {
    let settings = await this.findOne({ singleton: "main" });
    if (!settings) {
        settings = await this.create({
            singleton: "main",
            membershipPeriodStart: new Date(),
            membershipPeriodEnd: new Date(),
            annualContributionAmount: 0,
        });
    }
    return settings;
};

export default mongoose.model("Settings", settingsSchema);