// Path: src/Pages/admin/AdminInitiatives.jsx
import { useEffect, useState } from "react";
import { initiativeApi } from "@/services/api";
import { Check, X, Pencil, Trash2 } from "lucide-react";

const statusStyles = {
    pending: "bg-yellow-50 text-yellow-700",
    approved: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
};

export default function AdminInitiatives() {
    const [initiatives, setInitiatives] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchInitiatives = async () => {
        setLoading(true);
        try {
            const { data } = await initiativeApi.getAll();
            setInitiatives(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInitiatives();
    }, []);

    const handleReview = async (id, status) => {
        const rejectionReason = status === "rejected" ? window.prompt("Motif du rejet (optionnel) :") || "" : "";
        try {
            await initiativeApi.review(id, status, rejectionReason);
            fetchInitiatives();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = async (initiative) => {
        const title = window.prompt("Titre de l'initiative :", initiative.title);
        if (title === null) return;
        const description = window.prompt("Description :", initiative.description);
        if (description === null) return;
        if (!title.trim() || !description.trim()) {
            alert("Le titre et la description sont obligatoires.");
            return;
        }
        try {
            await initiativeApi.update(initiative._id, { title: title.trim(), description: description.trim() });
            await fetchInitiatives();
        } catch (error) {
            alert(error.response?.data?.message || "Impossible de modifier cette initiative.");
        }
    };

    const handleDelete = async (initiative) => {
        if (!window.confirm(`Supprimer l'initiative « ${initiative.title} » ?`)) return;
        try {
            await initiativeApi.remove(initiative._id);
            await fetchInitiatives();
        } catch (error) {
            alert(error.response?.data?.message || "Impossible de supprimer cette initiative.");
        }
    };

    return (
        <div className="p-6">
            <h1 className="font-fraunces text-2xl font-bold text-gray-800">Initiatives</h1>

            <div className="mt-6 space-y-3">
                {!loading &&
                    initiatives.map((init) => (
                        <div key={init._id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <div>
                                    <span className="font-fraunces text-lg font-bold text-gray-800">
                                        {init.title}
                                    </span>
                                    <p className="text-xs text-gray-500">
                                        Par {init.proposedBy?.fullName} ({init.proposedBy?.memberId})
                                    </p>
                                </div>
                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[init.status]}`}>
                                    {init.status}
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{init.description}</p>

                            {init.status === "pending" && (
                                <div className="mt-4 flex gap-2">
                                    <button
                                        onClick={() => handleReview(init._id, "approved")}
                                        className="flex items-center gap-1 rounded-full bg-[#D6336C] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                                    >
                                        <Check className="size-3.5" /> Approuver
                                    </button>
                                    <button
                                        onClick={() => handleReview(init._id, "rejected")}
                                        className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                                    >
                                        <X className="size-3.5" /> Rejeter
                                    </button>
                                </div>
                            )}
                            <div className="mt-3 flex gap-2 border-t border-gray-100 pt-3">
                                <button onClick={() => handleEdit(init)} className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600"><Pencil size={13}/> Modifier</button>
                                <button onClick={() => handleDelete(init)} className="inline-flex items-center gap-1 rounded-full border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600"><Trash2 size={13}/> Supprimer</button>
                            </div>
                        </div>
                    ))}
                {!loading && initiatives.length === 0 && (
                    <p className="text-sm text-gray-400">Aucune initiative proposée.</p>
                )}
            </div>
        </div>
    );
}