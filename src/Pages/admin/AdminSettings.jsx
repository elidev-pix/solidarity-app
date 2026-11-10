import { useEffect, useState } from "react";
import { settingsApi } from "@/services/api";

export default function AdminSettings() {
    const [form, setForm] = useState(null);
    const [saving, setSaving] = useState(false);
    const [testEmail, setTestEmail] = useState("");
    const [sendingTest, setSendingTest] = useState(false);

    useEffect(() => {
        settingsApi.get().then(({ data }) => {
            setForm({
                membershipPeriodStart: data.membershipPeriodStart?.slice(0, 10) || "",
                membershipPeriodEnd: data.membershipPeriodEnd?.slice(0, 10) || "",
                annualContributionAmount: data.annualContributionAmount || 0,
            });
        }).catch(console.error);
    }, []);

    if (!form) return <div className="p-6 text-sm text-gray-500">Chargement...</div>;

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSave = async () => {
        setSaving(true);
        try {
            await settingsApi.update({
                ...form,
                annualContributionAmount: Number(form.annualContributionAmount),
            });
            alert("Paramètres enregistrés.");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Erreur lors de l'enregistrement.");
        } finally {
            setSaving(false);
        }
    };

    const handleTestEmail = async () => {
        if (!testEmail.trim()) {
            alert("Saisissez l'adresse e-mail qui recevra le test.");
            return;
        }
        setSendingTest(true);
        try {
            const { data } = await settingsApi.testEmail(testEmail.trim());
            alert(data.message || "E-mail de test envoyé.");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Échec de l'envoi du test.");
        } finally {
            setSendingTest(false);
        }
    };

    return (
        <div className="p-6 max-w-xl space-y-6">
            <h1 className="font-fraunces text-2xl font-bold text-gray-800">Paramètres</h1>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <span className="text-sm font-semibold text-gray-700">Période d'adhésion</span>
                <div className="mt-3 grid grid-cols-2 gap-3">
                    <input
                        type="date"
                        name="membershipPeriodStart"
                        value={form.membershipPeriodStart}
                        onChange={handleChange}
                        className="rounded-xl border border-gray-200 p-2.5 text-sm"
                    />
                    <input
                        type="date"
                        name="membershipPeriodEnd"
                        value={form.membershipPeriodEnd}
                        onChange={handleChange}
                        className="rounded-xl border border-gray-200 p-2.5 text-sm"
                    />
                </div>

                <span className="mt-6 block text-sm font-semibold text-gray-700">Montant annuel de cotisation</span>
                <input
                    type="number"
                    name="annualContributionAmount"
                    value={form.annualContributionAmount}
                    onChange={handleChange}
                    className="mt-3 w-full rounded-xl border border-gray-200 p-2.5 text-sm"
                />

                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="mt-6 rounded-full bg-[#D6336C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                >
                    {saving ? "Enregistrement..." : "Enregistrer"}
                </button>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
                <h2 className="text-sm font-semibold text-gray-700">Tester la configuration e-mail</h2>
                <p className="mt-1 text-sm text-gray-500">
                    Envoyez un message de vérification pour confirmer que Resend est correctement configuré sur le serveur.
                </p>
                <input
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                    placeholder="adresse@exemple.com"
                    className="mt-4 w-full rounded-xl border border-gray-200 p-2.5 text-sm"
                />
                <button
                    onClick={handleTestEmail}
                    disabled={sendingTest}
                    className="mt-3 rounded-full bg-[#D6336C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-50"
                >
                    {sendingTest ? "Envoi du test..." : "Envoyer un e-mail de test"}
                </button>
            </div>
        </div>
    );
}
