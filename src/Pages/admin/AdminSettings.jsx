import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { settingsApi, systemApi } from "@/services/api";
import { Save, UserRound, Mail, AlertTriangle, Trash2, Settings2, CheckCircle2 } from "lucide-react";

const inputClass = "w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-3 text-sm outline-none transition focus:border-[#D6336C] focus:ring-2 focus:ring-[#D6336C]/10";

export default function AdminSettings() {
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const [resetForm, setResetForm] = useState({ confirmation: "", adminPassword: "" });
    const [resetting, setResetting] = useState(false);
    const [resetError, setResetError] = useState("");
    const [resetResult, setResetResult] = useState(null);

    useEffect(() => {
        let active = true;
        settingsApi.get().then(({ data }) => {
            if (active) setForm({
                membershipPeriodStart: data.membershipPeriodStart?.slice(0, 10) || "",
                membershipPeriodEnd: data.membershipPeriodEnd?.slice(0, 10) || "",
                annualContributionAmount: data.annualContributionAmount ?? 0,
                emailConfigured: data.emailConfigured === true,
            });
        }).catch((error) => console.error(error)).finally(() => { if (active) setLoading(false); });
        return () => { active = false; };
    }, []);

    const handleSave = async (event) => {
        event.preventDefault();
        setSaving(true);
        setSaveMessage("");
        try {
            const { data } = await settingsApi.update({
                membershipPeriodStart: form.membershipPeriodStart,
                membershipPeriodEnd: form.membershipPeriodEnd,
                annualContributionAmount: Number(form.annualContributionAmount),
            });
            setForm((current) => ({ ...current, ...data }));
            setSaveMessage("Les paramètres de l'application ont été enregistrés.");
        } catch (error) {
            setSaveMessage(error.response?.data?.message || "Erreur lors de l'enregistrement.");
        } finally { setSaving(false); }
    };

    const handleReset = async (event) => {
        event.preventDefault();
        setResetError("");
        setResetResult(null);
        if (resetForm.confirmation !== "VIDER SOLIDARITY") {
            setResetError('Saisissez exactement "VIDER SOLIDARITY" pour confirmer.');
            return;
        }
        if (!resetForm.adminPassword) {
            setResetError("Votre mot de passe administrateur est obligatoire.");
            return;
        }
        setResetting(true);
        try {
            const { data } = await systemApi.resetData(resetForm.confirmation, resetForm.adminPassword);
            setResetResult(data);
            setResetForm({ confirmation: "", adminPassword: "" });
        } catch (error) {
            setResetError(error.response?.data?.message || "La réinitialisation a échoué.");
        } finally { setResetting(false); }
    };

    if (loading) return <div className="p-6 text-sm text-gray-500">Chargement des paramètres…</div>;
    if (!form) return <div className="p-6 text-sm text-red-600">Impossible de charger les paramètres de l'application.</div>;

    return (
        <div className="min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
            <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D6336C]">CONFIGURATION</p><h1 className="mt-1 font-fraunces text-2xl font-bold text-gray-900 sm:text-3xl">Paramètres</h1><p className="mt-1 text-sm text-gray-500">Gérez les règles de fonctionnement et la sécurité de Solidarity.</p></div>

            <section className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-gray-100 p-5 sm:p-6"><span className="rounded-xl bg-[#D6336C]/10 p-3 text-[#D6336C]"><Settings2 size={20}/></span><div><h2 className="font-bold text-gray-900">Paramètres de l'application</h2><p className="mt-0.5 text-xs text-gray-500">Période d'adhésion et cotisation annuelle.</p></div></div>
                <form onSubmit={handleSave} className="p-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <label className="min-w-0 space-y-2 text-sm font-medium text-gray-700">Début de la campagne<input required type="date" value={form.membershipPeriodStart} onChange={(e) => setForm({ ...form, membershipPeriodStart: e.target.value })} className={inputClass}/></label>
                        <label className="min-w-0 space-y-2 text-sm font-medium text-gray-700">Fin de la campagne<input required type="date" value={form.membershipPeriodEnd} onChange={(e) => setForm({ ...form, membershipPeriodEnd: e.target.value })} className={inputClass}/></label>
                        <label className="min-w-0 space-y-2 text-sm font-medium text-gray-700 sm:col-span-2">Montant annuel de cotisation (FCFA)<input required type="number" min="0" step="500" value={form.annualContributionAmount} onChange={(e) => setForm({ ...form, annualContributionAmount: e.target.value })} className={inputClass}/></label>
                    </div>
                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        {saveMessage && <p role="status" className="text-sm text-gray-600">{saveMessage}</p>}
                        <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D6336C] px-5 py-3 text-sm font-semibold text-white hover:bg-[#B36CB2] disabled:opacity-60"><Save size={16}/>{saving ? "Enregistrement…" : "Enregistrer les paramètres"}</button>
                    </div>
                </form>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-start gap-3"><span className="rounded-xl bg-purple-50 p-3 text-[#B36CB2]"><Mail size={20}/></span><div className="min-w-0 flex-1"><h2 className="font-bold text-gray-900">Notifications par e-mail</h2><p className="mt-1 text-xs leading-5 text-gray-500">Les confirmations de demandes, les décisions d'adhésion et les identifiants temporaires sont envoyés par e-mail via Resend.</p><div className="mt-3 flex flex-wrap items-center gap-2"><span className={`size-2.5 rounded-full ${form.emailConfigured ? "bg-green-500" : "bg-amber-500"}`}/><span className="text-sm font-semibold text-gray-700">{form.emailConfigured ? "Variables d'envoi détectées" : "Configuration e-mail incomplète"}</span></div><p className="mt-2 text-xs text-gray-400">Les clés d'accès doivent rester dans les variables d'environnement du backend, jamais dans le frontend.</p></div></div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div className="flex items-center gap-3"><span className="rounded-xl bg-blue-50 p-3 text-blue-600"><UserRound size={20}/></span><div><h2 className="font-bold text-gray-900">Profil administrateur</h2><p className="mt-1 text-xs text-gray-500">Mettez à jour votre nom, vos coordonnées et votre mot de passe.</p></div></div><Link to="/admin/profil" className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">Gérer mon profil <UserRound size={15}/></Link></div>
            </section>

            <section className="overflow-hidden rounded-2xl border border-red-200 bg-white shadow-sm">
                <div className="border-b border-red-100 bg-red-50/70 p-5 sm:p-6"><div className="flex items-start gap-3"><span className="rounded-xl bg-red-100 p-3 text-red-600"><AlertTriangle size={20}/></span><div><h2 className="font-bold text-red-800">Zone de danger — Vider les données</h2><p className="mt-1 text-xs leading-5 text-red-700">Cette opération supprime définitivement les données opérationnelles de l'association. Elle ne peut pas être annulée.</p></div></div></div>
                <form onSubmit={handleReset} className="space-y-4 p-5 sm:p-6">
                    <div className="rounded-xl border border-amber-100 bg-amber-50 p-3 text-xs leading-5 text-amber-900"><strong>Seront supprimés :</strong> comptes membres, demandes d'adhésion, cotisations, participations, événements, actualités, initiatives et journal d'activité.<br/><strong>Seront conservés :</strong> comptes administrateurs et paramètres de l'application. Les fichiers déjà stockés dans Appwrite ne seront pas supprimés automatiquement.</div>
                    <label className="block space-y-2 text-sm font-medium text-gray-700">Pour confirmer, saisissez <code className="rounded bg-gray-100 px-1.5 py-1 text-red-600">VIDER SOLIDARITY</code><input value={resetForm.confirmation} onChange={(e) => setResetForm({ ...resetForm, confirmation: e.target.value })} className={inputClass} autoComplete="off" placeholder="VIDER SOLIDARITY"/></label>
                    <label className="block space-y-2 text-sm font-medium text-gray-700">Mot de passe administrateur<input type="password" value={resetForm.adminPassword} onChange={(e) => setResetForm({ ...resetForm, adminPassword: e.target.value })} className={inputClass} autoComplete="current-password" placeholder="Confirmez votre identité"/></label>
                    {resetError && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{resetError}</p>}
                    {resetResult && <div role="status" className="rounded-xl border border-green-100 bg-green-50 p-4 text-sm text-green-800"><p className="flex items-center gap-2 font-semibold"><CheckCircle2 size={17}/>{resetResult.message}</p><p className="mt-2 text-xs">Données supprimées : {Object.entries(resetResult.deleted || {}).map(([key, value]) => `${key} : ${value}`).join(" · ")}</p></div>}
                    <button type="submit" disabled={resetting || resetForm.confirmation !== "VIDER SOLIDARITY" || !resetForm.adminPassword} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"><Trash2 size={16}/>{resetting ? "Suppression en cours…" : "Vider les données opérationnelles"}</button>
                </form>
            </section>
        </div>
    );
}