import { useEffect, useState } from "react";
import { membershipRequestApi } from "@/services/api";
import CredentialsModal from "./CredentialsModal";
import { Check, X, Clock, Mail, Phone, CalendarDays } from "lucide-react";

const statusStyles = {
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    waitlisted: "bg-blue-50 text-blue-700 border-blue-200",
    accepted: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
};
const statusLabels = { pending: "En attente", waitlisted: "Liste d'attente", accepted: "Acceptée", rejected: "Rejetée" };

export default function MembershipRequestsTable() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [credentials, setCredentials] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [processingId, setProcessingId] = useState(null);
    const [error, setError] = useState("");

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const { data } = await membershipRequestApi.getAll();
            setRequests(data);
            setError("");
        } catch (requestError) {
            console.error(requestError);
            setError(requestError.response?.data?.message || "Impossible de charger les demandes.");
        } finally { setLoading(false); }
    };
    useEffect(() => { fetchRequests(); }, []);

    const handleAccept = async (id) => {
        setProcessingId(id);
        try {
            const { data } = await membershipRequestApi.accept(id);
            setCredentials({ ...data.credentials, emailSent: data.emailSent });
            setModalOpen(true);
            await fetchRequests();
        } catch (requestError) {
            console.error(requestError);
            alert(requestError.response?.data?.message || "Erreur lors de l'acceptation.");
        } finally { setProcessingId(null); }
    };

    const handleReject = async (id) => {
        const reason = window.prompt("Motif du rejet (facultatif) :") || "";
        setProcessingId(id);
        try {
            await membershipRequestApi.reject(id, reason);
            await fetchRequests();
        } catch (requestError) {
            console.error(requestError);
            alert(requestError.response?.data?.message || "Erreur lors du rejet.");
        } finally { setProcessingId(null); }
    };

    const actions = (req) => req.status === "pending" || req.status === "waitlisted" ? (
        <div className="flex flex-wrap gap-2">
            <button onClick={() => handleAccept(req._id)} disabled={processingId === req._id} className="inline-flex items-center justify-center gap-1 rounded-lg bg-[#D6336C] px-3 py-2 text-xs font-semibold text-white disabled:opacity-50"><Check size={14}/> Accepter</button>
            <button onClick={() => handleReject(req._id)} disabled={processingId === req._id} className="inline-flex items-center justify-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-600 disabled:opacity-50"><X size={14}/> Rejeter</button>
        </div>
    ) : <span className="text-xs text-gray-400">Demande traitée</span>;

    if (loading) return <div className="rounded-2xl bg-white p-8 text-center text-sm text-gray-500">Chargement des demandes…</div>;
    if (error) return <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm text-red-700">{error} <button onClick={fetchRequests} className="ml-2 font-semibold underline">Réessayer</button></div>;
    if (requests.length === 0) return <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">Aucune demande d'adhésion pour le moment.</div>;

    return (
        <>
            <div className="hidden overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm md:block">
                <div className="overflow-x-auto"><table className="w-full min-w-[760px] text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500"><tr><th className="px-4 py-3">Nom</th><th className="px-4 py-3">Contact</th><th className="px-4 py-3">Statut</th><th className="px-4 py-3">Reçue le</th><th className="px-4 py-3 text-right">Actions</th></tr></thead>
                    <tbody className="divide-y divide-gray-100">{requests.map((req) => <tr key={req._id} className="hover:bg-gray-50"><td className="px-4 py-3 font-semibold text-gray-800">{req.fullName}</td><td className="px-4 py-3 text-gray-600"><div>{req.email}</div><div className="text-xs text-gray-400">{req.phone}</div></td><td className="px-4 py-3"><span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[req.status]}`}>{req.status === "waitlisted" && <Clock size={12}/>} {statusLabels[req.status] || req.status}</span></td><td className="px-4 py-3 text-gray-500">{new Date(req.createdAt).toLocaleDateString("fr-FR")}</td><td className="px-4 py-3"><div className="flex justify-end">{actions(req)}</div></td></tr>)}</tbody>
                </table></div>
            </div>
            <div className="grid grid-cols-1 gap-3 md:hidden">{requests.map((req) => <article key={req._id} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="break-words font-semibold text-gray-900">{req.fullName}</h3><p className="mt-1 text-xs text-gray-400">Reçue le {new Date(req.createdAt).toLocaleDateString("fr-FR")}</p></div><span className={`shrink-0 rounded-full border px-2 py-1 text-[10px] font-semibold ${statusStyles[req.status]}`}>{statusLabels[req.status] || req.status}</span></div><div className="mt-3 space-y-2 text-xs text-gray-500"><p className="flex min-w-0 items-center gap-2 break-all"><Mail size={14} className="shrink-0"/>{req.email}</p><p className="flex items-center gap-2"><Phone size={14}/>{req.phone}</p>{req.city && <p className="flex items-center gap-2"><CalendarDays size={14}/>{req.city}</p>}</div>{req.motivation && <p className="mt-3 line-clamp-3 rounded-xl bg-gray-50 p-3 text-xs leading-5 text-gray-600">{req.motivation}</p>}<div className="mt-4 border-t border-gray-100 pt-3">{actions(req)}</div></article>)}</div>
            <CredentialsModal open={modalOpen} onClose={() => setModalOpen(false)} credentials={credentials}/>
        </>
    );
}