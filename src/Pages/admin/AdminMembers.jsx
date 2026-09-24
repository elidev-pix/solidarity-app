// Path: src/Pages/admin/AdminMembers.jsx
import { useEffect, useState } from "react";
import { userApi } from "@/services/api";
import MemberDetailModal from "@/Components/admin/MemberDetailModal";
import BulkImportModal from "@/Components/admin/BulkImportModal";
import CredentialsModal from "@/Components/admin/CredentialsModal";
import { UserPlus, Upload } from "lucide-react";

export default function AdminMembers() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [importOpen, setImportOpen] = useState(false);
    const [credentials, setCredentials] = useState(null);
    const [credModalOpen, setCredModalOpen] = useState(false);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const { data } = await userApi.getAll();
            setMembers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMembers();
    }, []);

    const handleAdd = async () => {
        const fullName = window.prompt("Nom complet du nouveau membre :");
        if (!fullName) return;
        try {
            const { data } = await userApi.create(fullName, "member");
            setCredentials(data.credentials);
            setCredModalOpen(true);
            fetchMembers();
        } catch (error) {
            console.error(error);
            alert("Erreur lors de la création.");
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-fraunces text-2xl font-bold text-gray-800">Membres</h1>
                    <p className="mt-1 text-sm text-gray-500">{members.length} membre(s)</p>
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => setImportOpen(true)}
                        className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                    >
                        <Upload className="size-4" /> Import
                    </button>
                    <button
                        onClick={handleAdd}
                        className="flex items-center gap-2 rounded-full bg-[#D6336C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                    >
                        <UserPlus className="size-4" /> Ajouter
                    </button>
                </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                        <tr>
                            <th className="px-4 py-3">Nom</th>
                            <th className="px-4 py-3">Identifiant</th>
                            <th className="px-4 py-3">Statut</th>
                            <th className="px-4 py-3">Inscrit le</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {!loading &&
                            members.map((m) => (
                                <tr
                                    key={m._id}
                                    onClick={() => {
                                        setSelected(m);
                                        setDetailOpen(true);
                                    }}
                                    className="cursor-pointer hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 font-medium text-gray-800">{m.fullName}</td>
                                    <td className="px-4 py-3 font-mono text-gray-600">{m.memberId}</td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {m.isFirstLogin ? "Jamais connecté" : "Actif"}
                                    </td>
                                    <td className="px-4 py-3 text-gray-500">
                                        {new Date(m.createdAt).toLocaleDateString("fr-FR")}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {loading && <p className="p-4 text-sm text-gray-500">Chargement...</p>}
            </div>

            <MemberDetailModal open={detailOpen} onClose={() => setDetailOpen(false)} member={selected} />
            <BulkImportModal open={importOpen} onClose={() => setImportOpen(false)} onDone={fetchMembers} />
            <CredentialsModal open={credModalOpen} onClose={() => setCredModalOpen(false)} credentials={credentials} />
        </div>
    );
}