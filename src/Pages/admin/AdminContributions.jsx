import { useCallback, useEffect, useState } from "react";
import { contributionApi, userApi } from "@/services/api";
import { Plus, Pencil, Trash2, X, Save, Wallet } from "lucide-react";

const currentYear = new Date().getFullYear();
const emptyForm = { userId: "", amount: "", method: "especes", note: "", paidAt: new Date().toISOString().slice(0, 10) };
const inputClass = "w-full min-w-0 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-[#D6336C] focus:ring-2 focus:ring-[#D6336C]/10";

const methodLabels = { especes: "Espèces", mobile_money: "Mobile Money", virement: "Virement", autre: "Autre" };

export default function AdminContributions() {
    const [year, setYear] = useState(currentYear);
    const [data, setData] = useState({ totalCollected: 0, contributions: [] });
    const [members, setMembers] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [contribRes, usersRes] = await Promise.all([contributionApi.getAll(year), userApi.getAll()]);
            setData(contribRes.data);
            setMembers(usersRes.data);
        } catch (requestError) {
            console.error(requestError);
            setError(requestError.response?.data?.message || "Impossible de charger les cotisations.");
        } finally {
            setLoading(false);
        }
    }, [year]);

    useEffect(() => { fetchData(); }, [fetchData]);

    function startEdit(contribution) {
        setEditingId(contribution._id);
        setForm({
            userId: contribution.user?._id || "",
            amount: String(contribution.amount || ""),
            method: contribution.method || "especes",
            note: contribution.note || "",
            paidAt: contribution.paidAt ? new Date(contribution.paidAt).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10),
        });
        setError("");
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function cancelEdit() {
        setEditingId(null);
        setForm(emptyForm);
        setError("");
    }

    async function handleSubmit(event) {
        event.preventDefault();
        if (!form.userId || !form.amount || Number(form.amount) <= 0) {
            setError("Sélectionnez un membre et saisissez un montant supérieur à zéro.");
            return;
        }
        setSaving(true);
        setError("");
        try {
            const payload = { ...form, amount: Number(form.amount), year };
            if (editingId) await contributionApi.update(editingId, payload);
            else await contributionApi.create(payload);
            cancelEdit();
            await fetchData();
        } catch (requestError) {
            console.error(requestError);
            setError(requestError.response?.data?.message || "Erreur lors de l'enregistrement.");
        } finally {
            setSaving(false);
        }
    }

    async function handleDelete(contribution) {
        const memberName = contribution.user?.fullName || "ce membre";
        if (!window.confirm(`Supprimer le versement de ${contribution.amount.toLocaleString("fr-FR")} FCFA enregistré pour ${memberName} ? Cette action est irréversible.`)) return;
        try {
            await contributionApi.remove(contribution._id);
            if (editingId === contribution._id) cancelEdit();
            await fetchData();
        } catch (requestError) {
            console.error(requestError);
            setError(requestError.response?.data?.message || "Impossible de supprimer cette cotisation.");
        }
    }

    return (
        <div className="min-w-0 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D6336C]">GESTION FINANCIÈRE</p><h1 className="mt-1 font-fraunces text-2xl font-bold text-gray-900 sm:text-3xl">Cotisations</h1><p className="mt-1 text-sm text-gray-500">Suivi et historique des versements des membres.</p></div>
                <select aria-label="Année des cotisations" value={year} onChange={(e) => { setYear(Number(e.target.value)); cancelEdit(); }} className={`${inputClass} w-full sm:w-36`}>
                    {[currentYear, currentYear - 1, currentYear - 2, currentYear - 3].map((y) => <option key={y} value={y}>{y}</option>)}
                </select>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"><div className="flex items-center gap-3"><span className="rounded-xl bg-[#D6336C]/10 p-3 text-[#D6336C]"><Wallet size={20}/></span><div><p className="text-xs text-gray-500">Total collecté en {year}</p><p className="mt-1 text-2xl font-bold text-gray-900">{(data.totalCollected || 0).toLocaleString("fr-FR")} <span className="text-sm font-semibold text-gray-400">FCFA</span></p></div></div></div>
                <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm"><p className="text-xs text-gray-500">Versements enregistrés</p><p className="mt-2 text-2xl font-bold text-gray-900">{data.contributions.length}</p><p className="mt-1 text-xs text-gray-400">Pour l'année sélectionnée</p></div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
                <div className="flex items-center justify-between gap-3"><div><h2 className="text-base font-bold text-gray-900">{editingId ? "Modifier le versement" : "Enregistrer une cotisation"}</h2><p className="mt-1 text-xs text-gray-500">Les changements sont immédiatement répercutés dans les statistiques.</p></div>{editingId && <button type="button" onClick={cancelEdit} className="rounded-full p-2 text-gray-400 hover:bg-gray-100" aria-label="Annuler la modification"><X size={18}/></button>}</div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
                    <select required value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} className={`${inputClass} xl:col-span-2`}><option value="">Sélectionner un membre…</option>{members.map((m) => <option key={m._id} value={m._id}>{m.fullName} ({m.memberId})</option>)}</select>
                    <input required type="number" min="1" step="1" placeholder="Montant (FCFA)" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} className={inputClass}/>
                    <select value={form.method} onChange={(e) => setForm({ ...form, method: e.target.value })} className={inputClass}><option value="especes">Espèces</option><option value="mobile_money">Mobile Money</option><option value="virement">Virement</option><option value="autre">Autre</option></select>
                    <input required type="date" aria-label="Date du versement" value={form.paidAt} onChange={(e) => setForm({ ...form, paidAt: e.target.value })} className={inputClass}/>
                    <input placeholder="Note (facultatif)" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} className={`${inputClass} sm:col-span-2 xl:col-span-4`}/>
                    <button type="submit" disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D6336C] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B36CB2] disabled:opacity-60"><Save size={16}/>{saving ? "Enregistrement…" : editingId ? "Mettre à jour" : <><Plus size={16}/> Ajouter</>}</button>
                </div>
                {error && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
            </form>

            <div className="mt-7 flex items-center justify-between"><h2 className="text-base font-bold text-gray-900">Historique des versements</h2><span className="text-xs text-gray-400">{data.contributions.length} résultat(s)</span></div>
            {loading ? <div className="mt-4 rounded-2xl bg-white p-8 text-center text-sm text-gray-500">Chargement des cotisations…</div> : data.contributions.length === 0 ? <div className="mt-4 rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">Aucun versement enregistré pour {year}.</div> : (
                <>
                    <div className="mt-4 hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
                        <div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm">
                            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-4 py-3">Membre</th><th className="px-4 py-3">Montant</th><th className="px-4 py-3">Méthode</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Note</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
                            <tbody className="divide-y divide-gray-100">{data.contributions.map((c) => <tr key={c._id} className="hover:bg-gray-50"><td className="px-4 py-3"><p className="font-semibold text-gray-800">{c.user?.fullName || "Membre archivé"}</p><p className="font-mono text-xs text-gray-400">{c.user?.memberId || "—"}</p></td><td className="px-4 py-3 font-semibold text-gray-800">{c.amount.toLocaleString("fr-FR")} FCFA</td><td className="px-4 py-3 text-gray-500">{methodLabels[c.method] || c.method}</td><td className="px-4 py-3 text-gray-500">{new Date(c.paidAt).toLocaleDateString("fr-FR")}</td><td className="max-w-[180px] truncate px-4 py-3 text-gray-400">{c.note || "—"}</td><td className="px-4 py-3"><div className="flex justify-end gap-2"><button type="button" onClick={() => startEdit(c)} aria-label="Modifier la cotisation" className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-[#D6336C] hover:text-[#D6336C]"><Pencil size={15}/></button><button type="button" onClick={() => handleDelete(c)} aria-label="Supprimer la cotisation" className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50"><Trash2 size={15}/></button></div></td></tr>)}</tbody>
                        </table></div>
                    </div>
                    <div className="mt-4 grid grid-cols-1 gap-3 md:hidden">{data.contributions.map((c) => <article key={c._id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><p className="truncate font-semibold text-gray-900">{c.user?.fullName || "Membre archivé"}</p><p className="mt-0.5 font-mono text-xs text-gray-400">{c.user?.memberId || "—"}</p></div><p className="shrink-0 text-right font-bold text-[#D6336C]">{c.amount.toLocaleString("fr-FR")} FCFA</p></div><div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500"><span>{methodLabels[c.method] || c.method}</span><span>{new Date(c.paidAt).toLocaleDateString("fr-FR")}</span></div>{c.note && <p className="mt-2 text-xs text-gray-400">{c.note}</p>}<div className="mt-3 flex justify-end gap-2 border-t border-gray-100 pt-3"><button type="button" onClick={() => startEdit(c)} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600"><Pencil size={13}/> Modifier</button><button type="button" onClick={() => handleDelete(c)} className="inline-flex items-center gap-1 rounded-lg border border-red-100 px-3 py-2 text-xs font-semibold text-red-600"><Trash2 size={13}/> Supprimer</button></div></article>)}</div>
                </>
            )}
        </div>
    );
}