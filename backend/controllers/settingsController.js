// Path: backend/controllers/settingsController.js
import Settings from "../models/Settings.js";

/** GET /api/settings */
export async function getSettings(req, res) {
    try {
        const settings = await Settings.getSettings();
        return res.status(200).json(settings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}

/** PUT /api/settings (admin) */
export async function updateSettings(req, res) {
    try {
        const { membershipPeriodStart, membershipPeriodEnd, annualContributionAmount } = req.body;
        const settings = await Settings.getSettings();

        if (membershipPeriodStart !== undefined) settings.membershipPeriodStart = membershipPeriodStart;
        if (membershipPeriodEnd !== undefined) settings.membershipPeriodEnd = membershipPeriodEnd;
        if (annualContributionAmount !== undefined)
            settings.annualContributionAmount = annualContributionAmount;

        await settings.save();
        return res.status(200).json(settings);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
}