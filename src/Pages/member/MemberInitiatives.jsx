// Path: src/Pages/member/MemberInitiatives.jsx
import { useEffect, useState } from "react";
import { initiativeApi } from "@/services/api";
import { Plus, Pencil, Trash2, X, Save } from "lucide-react";

const statusStyles = {
    pending: "bg-yellow-50 text-yellow-700",
    approved: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
};
const statusLabels = { pending: "En attente", approved: "Approuvée", rejected: "Rejetée" };
const emptyForm = { title: "", description: "" };

export default function MemberInitiatives() {
    const [initiatives, setInitiatives] = useState([]);
    const [form, setForm] = useState(emptyForm);
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const fetchInitiatives = async () => {
        setLoading(true);
        try {
            const { data } = await initiativeApi.getMine();
            setInitiatives(data);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Impossible de charger vos initiatives.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchInitiatives(); }, []);

    const resetForm = () => {
        setForm(emptyForm);
        setEditingId(null);
    };

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.description.trim()) {
            alert("Renseignez le titre et la description.");
            return;
        }
        setSaving(true);
        try {
            if (editingId) await initiativeApi.update(editingId, form);
            else await initiativeApi.create(form);
            resetForm();
            await fetchInitiatives();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Impossible d'enregistrer l'initiative.");
        } finally {
            setSaving(false);
        }
    };

    const handleEdit = (initiative) => {
        setEditingId(initiative._id);
        setForm({ title: initiative.title || "", description: initiative.description || "" });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const handleDelete = async (initiative) => {
        if (!window.confirm(`Supprimer votre initiative « ${initiative.title} » ?`)) return;
        try {
            await initiativeApi.remove(initiative._id);
            if (editingId === initiative._id) resetForm();
            await fetchInitiatives();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Impossible de supprimer cette initiative.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="font-fraunces text-2xl font-bold text-gray-800">Mes initiatives</h1>

            <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-semibold text-gray-700">{editingId ? "Modifier mon initiative" : "Proposer une initiative"}</span>
                    {editingId && <button onClick={resetForm} className="inline-flex items-center gap-1 text-xs text-gray-500"><X size={14}/> Annuler</button>}
                </div>
                <div className="mt-3 space-y-3">
                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Titre" className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none"/>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none"/>
                    <button onClick={handleSubmit} disabled={saving} className="flex items-center gap-2 rounded-full bg-[#D6336C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60">
                        {editingId ? <Save size={15}/> : <Plus size={15}/>} {saving ? "Enregistrement..." : editingId ? "Enregistrer" : "Proposer"}
                    </button>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                {loading && <p className="text-sm text-gray-500">Chargement...</p>}
                {!loading && initiatives.map((init) => (
                    <div key={init._id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div className="flex items-start justify-between gap-3">
                            <span className="font-fraunces text-lg font-bold text-gray-800">{init.title}</span>
                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[init.status] || "bg-gray-100 text-gray-600"}`}>{statusLabels[init.status] || init.status}</span>
                        </div>
                        <p className="mt-2 whitespace-pre-wrap text-sm text-gray-600">{init.description}</p>
                        {init.status === "rejected" && init.rejectionReason && <p className="mt-2 text-xs text-red-500">Motif : {init.rejectionReason}</p>}
                        {init.status === "pending" && (
                            <div className="mt-4 flex gap-2">
                                <button onClick={() => handleEdit(init)} className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600"><Pencil size={13}/> Modifier</button>
                                <button onClick={() => handleDelete(init)} className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600"><Trash2 size={13}/> Supprimer</button>
                            </div>
                        )}
                    </div>
                ))}
                {!loading && initiatives.length === 0 && <p className="text-sm text-gray-400">Vous n'avez pas encore proposé d'initiative.</p>}
            </div>
        </div>
    );
}
