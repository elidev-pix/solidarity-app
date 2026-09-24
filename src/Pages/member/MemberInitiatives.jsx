// Path: src/Pages/member/MemberInitiatives.jsx
import { useEffect, useState } from "react";
import { initiativeApi } from "@/services/api";
import { Plus } from "lucide-react";

const statusStyles = {
    pending: "bg-yellow-50 text-yellow-700",
    approved: "bg-green-50 text-green-700",
    rejected: "bg-red-50 text-red-700",
};

const statusLabels = { pending: "En attente", approved: "Approuvée", rejected: "Rejetée" };

export default function MemberInitiatives() {
    const [initiatives, setInitiatives] = useState([]);
    const [form, setForm] = useState({ title: "", description: "" });
    const [loading, setLoading] = useState(true);

    const fetchInitiatives = async () => {
        setLoading(true);
        try {
            const { data } = await initiativeApi.getMine();
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

    const handleSubmit = async () => {
        if (!form.title || !form.description) return;
        try {
            await initiativeApi.create(form);
            setForm({ title: "", description: "" });
            fetchInitiatives();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="font-fraunces text-2xl font-bold text-gray-800">Mes initiatives</h1>

            <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                <span className="text-sm font-semibold text-gray-700">Proposer une initiative</span>
                <div className="mt-3 space-y-3">
                    <input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Titre"
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none"
                    />
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        placeholder="Description"
                        rows={3}
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none"
                    />
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 rounded-full bg-[#D6336C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                    >
                        <Plus className="size-4" /> Proposer
                    </button>
                </div>
            </div>

            <div className="mt-6 space-y-3">
                {!loading &&
                    initiatives.map((init) => (
                        <div key={init._id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <span className="font-fraunces text-lg font-bold text-gray-800">{init.title}</span>
                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusStyles[init.status]}`}>
                                    {statusLabels[init.status]}
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-600">{init.description}</p>
                            {init.status === "rejected" && init.rejectionReason && (
                                <p className="mt-2 text-xs text-red-500">Motif : {init.rejectionReason}</p>
                            )}
                        </div>
                    ))}
            </div>
        </div>
    );
}