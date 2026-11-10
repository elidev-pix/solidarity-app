// Path: src/Pages/admin/AdminContributions.jsx
import { useEffect, useState } from "react";
import { contributionApi, userApi } from "@/services/api";
import { Plus, Pencil, Trash2 } from "lucide-react";

const currentYear = new Date().getFullYear();

export default function AdminContributions() {
    const [year, setYear] = useState(currentYear);
    const [data, setData] = useState({ totalCollected: 0, contributions: [] });
    const [members, setMembers] = useState([]);
    const [form, setForm] = useState({ userId: "", amount: "", method: "especes", note: "" });
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [contribRes, usersRes] = await Promise.all([
                contributionApi.getAll(year),
                userApi.getAll(),
            ]);
            setData(contribRes.data);
            setMembers(usersRes.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year]);

    const handleSubmit = async () => {
        if (!form.userId || !form.amount) return;
        try {
            await contributionApi.create({ ...form, amount: Number(form.amount), year });
            setForm({ userId: "", amount: "", method: "especes", note: "" });
            fetchData();
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'enregistrement.");
        }
    };

    const handleEdit = async (contribution) => {
        const amountValue = window.prompt("Nouveau montant (FCFA) :", String(contribution.amount));
        if (amountValue === null) return;
        const amount = Number(amountValue);
        if (!Number.isFinite(amount) || amount < 0) {
            alert("Montant invalide.");
            return;
        }
        const methods = ["especes", "mobile_money", "virement", "autre"];
        const methodValue = window.prompt("Méthode (especes, mobile_money, virement, autre) :", contribution.method || "especes");
        if (methodValue === null) return;
        if (!methods.includes(methodValue)) {
            alert("Méthode invalide.");
            return;
        }
        try {
            await contributionApi.update(contribution._id, { amount, method: methodValue });
            await fetchData();
        } catch (error) {
            alert(error.response?.data?.message || "Impossible de modifier cette cotisation.");
        }
    };

    const handleDelete = async (contribution) => {
        if (!window.confirm(`Supprimer la cotisation de ${contribution.amount} FCFA pour ${contribution.user?.fullName || "ce membre"} ?`)) return;
        try {
            await contributionApi.remove(contribution._id);
            await fetchData();
        } catch (error) {
            alert(error.response?.data?.message || "Impossible de supprimer cette cotisation.");
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <h1 className="font-fraunces text-2xl font-bold text-gray-800">Cotisations</h1>
                <select
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                    className="rounded-full border border-gray-200 px-4 py-2 text-sm"
                >
                    {[currentYear, currentYear - 1, currentYear - 2].map((y) => (
                        <option key={y} value={y}>
                            {y}
                        </option>
                    ))}
                </select>
            </div>

            <p className="mt-4 text-3xl font-bold text-[#D6336C]">
                {data.totalCollected.toLocaleString("fr-FR")} FCFA
                <span className="ml-2 text-sm font-normal text-gray-500">collectés en {year}</span>
            </p>

            <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <span className="text-sm font-semibold text-gray-700">Enregistrer un paiement</span>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-4">
                    <select
                        value={form.userId}
                        onChange={(e) => setForm({ ...form, userId: e.target.value })}
                        className="rounded-xl border border-gray-200 p-2.5 text-sm"
                    >
                        <option value="">Membre...</option>
                        {members.map((m) => (
                            <option key={m._id} value={m._id}>
                                {m.fullName} ({m.memberId})
                            </option>
                        ))}
                    </select>
                    <input
                        type="number"
                        placeholder="Montant"
                        value={form.amount}
                        onChange={(e) => setForm({ ...form, amount: e.target.value })}
                        className="rounded-xl border border-gray-200 p-2.5 text-sm"
                    />
                    <select
                        value={form.method}
                        onChange={(e) => setForm({ ...form, method: e.target.value })}
                        className="rounded-xl border border-gray-200 p-2.5 text-sm"
                    >
                        <option value="especes">Espèces</option>
                        <option value="mobile_money">Mobile Money</option>
                        <option value="virement">Virement</option>
                        <option value="autre">Autre</option>
                    </select>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center justify-center gap-1 rounded-xl bg-[#D6336C] p-2.5 text-sm font-semibold text-white hover:opacity-90"
                    >
                        <Plus className="size-4" /> Ajouter
                    </button>
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                        <tr>
                            <th className="px-4 py-3">Membre</th>
                            <th className="px-4 py-3">Montant</th>
                            <th className="px-4 py-3">Méthode</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {!loading &&
                            data.contributions.map((c) => (
                                <tr key={c._id}>
                                    <td className="px-4 py-3 font-medium text-gray-800">
                                        {c.user?.fullName} ({c.user?.memberId})
                                    </td>
                                    <td className="px-4 py-3">{c.amount.toLocaleString("fr-FR")} FCFA</td>
                                    <td className="px-4 py-3 capitalize text-gray-500">{c.method}</td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {new Date(c.paidAt).toLocaleDateString("fr-FR")}
                                    </td>
                                    <td className="px-4 py-3">
                                        <div className="flex justify-end gap-2">
                                            <button onClick={() => handleEdit(c)} aria-label="Modifier la cotisation" className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50"><Pencil size={14}/></button>
                                            <button onClick={() => handleDelete(c)} aria-label="Supprimer la cotisation" className="rounded-lg border border-red-200 p-2 text-red-600 hover:bg-red-50"><Trash2 size={14}/></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}