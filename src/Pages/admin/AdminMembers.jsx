import { useEffect, useState } from "react";
import { userApi } from "@/services/api";
import MemberDetailModal from "@/Components/admin/MemberDetailModal";
import MemberEditModal from "@/Components/admin/MemberEditModal";
import BulkImportModal from "@/Components/admin/BulkImportModal";
import CredentialsModal from "@/Components/admin/CredentialsModal";
import { UserPlus, Upload, Pencil, Trash2 } from "lucide-react";

export default function AdminMembers() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
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
            alert(error.response?.data?.message || "Impossible de charger les membres.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMembers(); }, []);

    const handleAdd = async () => {
        const fullName = window.prompt("Nom complet du nouveau membre :");
        if (!fullName?.trim()) return;
        try {
            const { data } = await userApi.create(fullName.trim(), "member");
            setCredentials(data.credentials);
            setCredModalOpen(true);
            await fetchMembers();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Erreur lors de la création.");
        }
    };

    const handleArchive = async (member) => {
        const confirmation = window.confirm(
            `Retirer ${member.fullName} de la liste des membres ?\n\nLe compte sera archivé, son accès sera bloqué et son historique sera conservé. Cette action peut nécessiter une réactivation par un administrateur.`
        );
        if (!confirmation) return;
        try {
            await userApi.archive(member._id);
            setSelected(null);
            await fetchMembers();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Impossible d'archiver ce membre.");
        }
    };

    const handleEdit = (member) => {
        setSelected(member);
        setEditOpen(true);
    };

    return (
        <div className="p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-fraunces text-2xl font-bold text-gray-800">Membres</h1>
                    <p className="mt-1 text-sm text-gray-500">{members.length} membre(s) actif(s)</p>
                </div>
                <div className="flex flex-wrap gap-2">
                    <button onClick={() => setImportOpen(true)} className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50">
                        <Upload className="size-4" /> Import
                    </button>
                    <button onClick={handleAdd} className="flex items-center gap-2 rounded-full bg-[#D6336C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
                        <UserPlus className="size-4" /> Ajouter
                    </button>
                </div>
            </div>

            <div className="mt-6 overflow-x-auto rounded-2xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                        <tr>
                            <th className="px-4 py-3">Nom</th>
                            <th className="px-4 py-3">Identifiant</th>
                            <th className="px-4 py-3">E-mail</th>
                            <th className="px-4 py-3">Téléphone</th>
                            <th className="px-4 py-3">Statut</th>
                            <th className="px-4 py-3">Inscrit le</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {!loading && members.map((member) => (
                            <tr key={member._id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-800">{member.fullName}</td>
                                <td className="px-4 py-3 font-mono text-gray-600">{member.memberId}</td>
                                <td className="px-4 py-3 text-gray-600">{member.email || "—"}</td>
                                <td className="px-4 py-3 text-gray-600">{member.phone || "—"}</td>
                                <td className="px-4 py-3 text-gray-500">{member.isFirstLogin ? "Première connexion" : "Actif"}</td>
                                <td className="px-4 py-3 text-gray-500">{member.createdAt ? new Date(member.createdAt).toLocaleDateString("fr-FR") : "—"}</td>
                                <td className="px-4 py-3">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            type="button"
                                            onClick={() => { setSelected(member); setDetailOpen(true); }}
                                            className="rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100"
                                        >Détails</button>
                                        <button
                                            type="button"
                                            onClick={() => handleEdit(member)}
                                            aria-label={`Modifier ${member.fullName}`}
                                            className="inline-flex items-center gap-1 rounded-lg border border-[#D6336C]/30 px-3 py-2 text-xs font-semibold text-[#D6336C] hover:bg-pink-50"
                                        ><Pencil className="size-3.5" /> Modifier</button>
                                        <button
                                            type="button"
                                            onClick={() => handleArchive(member)}
                                            aria-label={`Supprimer ou archiver ${member.fullName}`}
                                            className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 hover:bg-red-50"
                                        ><Trash2 className="size-3.5" /> Supprimer</button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {!loading && members.length === 0 && (
                            <tr><td colSpan={7} className="px-4 py-10 text-center text-gray-500">Aucun membre actif à afficher.</td></tr>
                        )}
                    </tbody>
                </table>
                {loading && <p className="p-4 text-sm text-gray-500">Chargement des membres…</p>}
            </div>

            <MemberDetailModal open={detailOpen} onClose={() => setDetailOpen(false)} member={selected} />
            <MemberEditModal
                open={editOpen}
                member={selected}
                onClose={() => setEditOpen(false)}
                onDone={async () => { setEditOpen(false); await fetchMembers(); }}
            />
            <BulkImportModal open={importOpen} onClose={() => setImportOpen(false)} onDone={fetchMembers} />
            <CredentialsModal open={credModalOpen} onClose={() => setCredModalOpen(false)} credentials={credentials} />
        </div>
    );
}
