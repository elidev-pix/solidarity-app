import { useEffect, useState } from "react";
import { userApi } from "@/services/api";
import MemberDetailModal from "@/Components/admin/MemberDetailModal";
import MemberEditModal from "@/Components/admin/MemberEditModal";
import BulkImportModal from "@/Components/admin/BulkImportModal";
import CredentialsModal from "@/Components/admin/CredentialsModal";
import { UserPlus, Upload, Pencil, Trash2, Eye, Users } from "lucide-react";

export default function AdminMembers() {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selected, setSelected] = useState(null);
    const [detailOpen, setDetailOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [importOpen, setImportOpen] = useState(false);
    const [credentials, setCredentials] = useState(null);
    const [credModalOpen, setCredModalOpen] = useState(false);
    const [addOpen, setAddOpen] = useState(false);
    const [adding, setAdding] = useState(false);
    const [addError, setAddError] = useState("");
    const [newMember, setNewMember] = useState({ fullName: "", email: "", phone: "" });

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const { data } = await userApi.getAll();
            setMembers(data);
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Impossible de charger les membres.");
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchMembers(); }, []);

    const handleAdd = async (event) => {
        event.preventDefault();
        if (!newMember.fullName.trim()) {
            setAddError("Le nom complet est obligatoire.");
            return;
        }
        setAdding(true);
        setAddError("");
        try {
            const { data } = await userApi.create({
                fullName: newMember.fullName.trim(),
                email: newMember.email.trim(),
                phone: newMember.phone.trim(),
                role: "member",
            });
            setCredentials({ ...data.credentials, emailSent: data.emailSent });
            setCredModalOpen(true);
            setAddOpen(false);
            setNewMember({ fullName: "", email: "", phone: "" });
            await fetchMembers();
        } catch (error) {
            console.error(error);
            setAddError(error.response?.data?.message || "Erreur lors de la création du membre.");
        } finally { setAdding(false); }
    };

    const handleArchive = async (member) => {
        if (!window.confirm(`Archiver le compte de ${member.fullName} ? Son accès sera bloqué, mais son historique sera conservé.`)) return;
        try {
            await userApi.archive(member._id);
            setSelected(null);
            await fetchMembers();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Impossible d'archiver ce membre.");
        }
    };

    const openDetails = (member) => { setSelected(member); setDetailOpen(true); };
    const openEdit = (member) => { setSelected(member); setEditOpen(true); };

    return (
        <div className="min-w-0 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D6336C]">COMMUNAUTÉ</p><h1 className="mt-1 font-fraunces text-2xl font-bold text-gray-900 sm:text-3xl">Membres</h1><p className="mt-1 text-sm text-gray-500">{members.length} membre(s) actif(s)</p></div>
                <div className="grid grid-cols-2 gap-2 sm:flex"><button onClick={() => setImportOpen(true)} className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 sm:px-4"><Upload size={16}/> Importer</button><button onClick={() => { setAddError(""); setAddOpen(true); }} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D6336C] px-3 py-2.5 text-sm font-semibold text-white hover:bg-[#B36CB2] sm:px-4"><UserPlus size={16}/> Ajouter</button></div>
            </div>

            {loading ? <div className="mt-6 rounded-2xl bg-white p-8 text-center text-sm text-gray-500">Chargement des membres…</div> : members.length === 0 ? <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center"><Users className="mx-auto text-gray-300" size={30}/><p className="mt-3 text-sm text-gray-500">Aucun membre actif à afficher.</p></div> : (
                <>
                    <div className="mt-6 hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
                        <div className="overflow-x-auto"><table className="w-full min-w-[850px] text-left text-sm">
                            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-4 py-3">Nom</th><th className="px-4 py-3">Identifiant</th><th className="px-4 py-3">E-mail</th><th className="px-4 py-3">Téléphone</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3">Inscrit le</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
                            <tbody className="divide-y divide-gray-100">{members.map((member) => <tr key={member._id} className="hover:bg-gray-50"><td className="px-4 py-3 font-semibold text-gray-800">{member.fullName}</td><td className="px-4 py-3 font-mono text-gray-600">{member.memberId}</td><td className="px-4 py-3 text-gray-600">{member.email || "—"}</td><td className="px-4 py-3 text-gray-600">{member.phone || "—"}</td><td className="px-4 py-3 text-gray-500">{member.isFirstLogin ? "Première connexion" : "Actif"}</td><td className="px-4 py-3 text-gray-500">{member.createdAt ? new Date(member.createdAt).toLocaleDateString("fr-FR") : "—"}</td><td className="px-4 py-3"><div className="flex justify-end gap-2"><button onClick={() => openDetails(member)} className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:bg-gray-50" aria-label="Détails"><Eye size={15}/></button><button onClick={() => openEdit(member)} className="rounded-lg border border-[#D6336C]/20 p-2 text-[#D6336C] hover:bg-pink-50" aria-label="Modifier"><Pencil size={15}/></button><button onClick={() => handleArchive(member)} className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50" aria-label="Archiver"><Trash2 size={15}/></button></div></td></tr>)}</tbody>
                        </table></div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 md:hidden">{members.map((member) => <article key={member._id} className="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"><div className="flex items-start gap-3"><div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#D6336C]/10 text-sm font-bold text-[#D6336C]">{member.fullName?.split(" ").map((part) => part[0]).slice(0,2).join("").toUpperCase()}</div><div className="min-w-0 flex-1"><p className="break-words font-semibold text-gray-900">{member.fullName}</p><p className="mt-0.5 font-mono text-xs text-gray-400">{member.memberId}</p></div><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${member.isFirstLogin ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}>{member.isFirstLogin ? "À activer" : "Actif"}</span></div><div className="mt-3 space-y-1 text-xs text-gray-500"><p className="break-all">{member.email || "E-mail non renseigné"}</p><p>{member.phone || "Téléphone non renseigné"}</p><p>Inscrit le {member.createdAt ? new Date(member.createdAt).toLocaleDateString("fr-FR") : "—"}</p></div><div className="mt-4 grid grid-cols-3 gap-2 border-t border-gray-100 pt-3"><button onClick={() => openDetails(member)} className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-200 px-2 py-2 text-xs font-semibold text-gray-600"><Eye size={13}/> Détails</button><button onClick={() => openEdit(member)} className="inline-flex items-center justify-center gap-1 rounded-lg border border-[#D6336C]/20 px-2 py-2 text-xs font-semibold text-[#D6336C]"><Pencil size={13}/> Modifier</button><button onClick={() => handleArchive(member)} className="inline-flex items-center justify-center gap-1 rounded-lg border border-red-100 px-2 py-2 text-xs font-semibold text-red-600"><Trash2 size={13}/> Archiver</button></div></article>)}</div>
                </>
            )}

            {addOpen && <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/50 p-3 sm:p-6"><form onSubmit={handleAdd} className="my-4 max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-5 shadow-xl sm:p-7"><div className="flex items-start justify-between gap-3"><div><h2 className="font-fraunces text-xl font-bold text-gray-900">Ajouter un membre</h2><p className="mt-1 text-xs leading-5 text-gray-500">Les identifiants seront générés automatiquement.</p></div><button type="button" onClick={() => setAddOpen(false)} aria-label="Fermer" className="rounded-full p-2 text-gray-400 hover:bg-gray-100">×</button></div><div className="mt-5 space-y-4"><label className="block space-y-2 text-sm font-semibold text-gray-700">Nom complet *<input required autoFocus value={newMember.fullName} onChange={(event) => setNewMember({ ...newMember, fullName: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm font-normal outline-none focus:border-[#D6336C]" placeholder="Nom et prénom"/></label><label className="block space-y-2 text-sm font-semibold text-gray-700">Adresse e-mail<input type="email" value={newMember.email} onChange={(event) => setNewMember({ ...newMember, email: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm font-normal outline-none focus:border-[#D6336C]" placeholder="membre@exemple.com"/><span className="text-xs font-normal text-gray-400">Si renseignée, les identifiants seront envoyés par e-mail.</span></label><label className="block space-y-2 text-sm font-semibold text-gray-700">Téléphone<input type="tel" value={newMember.phone} onChange={(event) => setNewMember({ ...newMember, phone: event.target.value })} className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm font-normal outline-none focus:border-[#D6336C]" placeholder="+226 …"/></label></div>{addError && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{addError}</p>}<div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={() => setAddOpen(false)} className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-600">Annuler</button><button type="submit" disabled={adding} className="rounded-xl bg-[#D6336C] px-5 py-3 text-sm font-semibold text-white disabled:opacity-50">{adding ? "Création…" : "Créer le membre"}</button></div></form></div>}
            <MemberDetailModal open={detailOpen} onClose={() => setDetailOpen(false)} member={selected}/>
            <MemberEditModal open={editOpen} member={selected} onClose={() => setEditOpen(false)} onDone={async () => { setEditOpen(false); await fetchMembers(); }}/>
            <BulkImportModal open={importOpen} onClose={() => setImportOpen(false)} onDone={fetchMembers}/>
            <CredentialsModal open={credModalOpen} onClose={() => setCredModalOpen(false)} credentials={credentials}/>
        </div>
    );
}