import { useEffect, useState } from "react";
import { userApi } from "@/services/api";
import { X, Save } from "lucide-react";

const emptyForm = { fullName: "", email: "", phone: "" };

export default function MemberEditModal({ open, member, onClose, onDone }) {
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        setForm(member ? {
            fullName: member.fullName || "",
            email: member.email || "",
            phone: member.phone || "",
        } : emptyForm);
        setError("");
    }, [member, open]);

    if (!open || !member) return null;

    const handleChange = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }));

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!form.fullName.trim()) {
            setError("Le nom complet est obligatoire.");
            return;
        }
        setSaving(true);
        setError("");
        try {
            await userApi.update(member._id, {
                fullName: form.fullName.trim(),
                email: form.email.trim(),
                phone: form.phone.trim(),
            });
            await onDone?.();
        } catch (requestError) {
            setError(requestError.response?.data?.message || "Impossible d'enregistrer les modifications.");
        } finally {
            setSaving(false);
        }
    };

    const inputClass = "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#D6336C] focus:ring-1 focus:ring-[#D6336C]";

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4" role="dialog" aria-modal="true" aria-labelledby="edit-member-title">
            <form onSubmit={handleSubmit} className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
                <button type="button" onClick={onClose} aria-label="Fermer" className="absolute right-4 top-4 text-gray-400 hover:text-gray-700">
                    <X className="size-5" />
                </button>
                <h2 id="edit-member-title" className="font-fraunces text-2xl font-bold text-[#D6336C]">Modifier le membre</h2>
                <p className="mt-1 text-sm text-gray-500">Identifiant : <span className="font-mono">{member.memberId}</span> (non modifiable)</p>
                <div className="mt-6 space-y-4">
                    <label className="block space-y-1.5 text-sm font-medium text-gray-700">
                        Nom complet *
                        <input name="fullName" required value={form.fullName} onChange={handleChange} className={inputClass} autoComplete="name" />
                    </label>
                    <label className="block space-y-1.5 text-sm font-medium text-gray-700">
                        Adresse e-mail
                        <input name="email" type="email" value={form.email} onChange={handleChange} className={inputClass} autoComplete="email" placeholder="membre@exemple.com" />
                    </label>
                    <label className="block space-y-1.5 text-sm font-medium text-gray-700">
                        Téléphone
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange} className={inputClass} autoComplete="tel" placeholder="+226 ..." />
                    </label>
                </div>
                {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
                <div className="mt-6 flex justify-end gap-3">
                    <button type="button" onClick={onClose} disabled={saving} className="rounded-full border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50">Annuler</button>
                    <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-[#D6336C] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60">
                        <Save className="size-4" /> {saving ? "Enregistrement…" : "Enregistrer"}
                    </button>
                </div>
            </form>
        </div>
    );
}
