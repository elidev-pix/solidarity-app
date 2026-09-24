// Path: src/Components/admin/MembershipRequestsTable.jsx
import { useEffect, useState } from "react";
import { membershipRequestApi } from "@/services/api";
import CredentialsModal from "./CredentialsModal";
import { Check, X, Clock } from "lucide-react";

const statusStyles = {
    pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
    waitlisted: "bg-blue-50 text-blue-700 border-blue-200",
    accepted: "bg-green-50 text-green-700 border-green-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
};

const statusLabels = {
    pending: "En attente",
    waitlisted: "Liste d'attente",
    accepted: "Acceptée",
    rejected: "Rejetée",
};

export default function MembershipRequestsTable() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [credentials, setCredentials] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [processingId, setProcessingId] = useState(null);

    const fetchRequests = async () => {
        setLoading(true);
        try {
            const { data } = await membershipRequestApi.getAll();
            setRequests(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleAccept = async (id) => {
        setProcessingId(id);
        try {
            const { data } = await membershipRequestApi.accept(id);
            setCredentials(data.credentials);
            setModalOpen(true);
            await fetchRequests();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Erreur lors de l'acceptation.");
        } finally {
            setProcessingId(null);
        }
    };

    const handleReject = async (id) => {
        const reason = window.prompt("Motif du rejet (optionnel) :") || "";
        setProcessingId(id);
        try {
            await membershipRequestApi.reject(id, reason);
            await fetchRequests();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Erreur lors du rejet.");
        } finally {
            setProcessingId(null);
        }
    };

    if (loading) {
        return <p className="text-sm text-gray-500">Chargement des demandes...</p>;
    }

    if (requests.length === 0) {
        return <p className="text-sm text-gray-500">Aucune demande d'adhésion pour le moment.</p>;
    }

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                        <tr>
                            <th className="px-4 py-3">Nom</th>
                            <th className="px-4 py-3">Contact</th>
                            <th className="px-4 py-3">Statut</th>
                            <th className="px-4 py-3">Reçue le</th>
                            <th className="px-4 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {requests.map((req) => (
                            <tr key={req._id} className="hover:bg-gray-50">
                                <td className="px-4 py-3 font-medium text-gray-800">{req.fullName}</td>
                                <td className="px-4 py-3 text-gray-600">
                                    <div>{req.email}</div>
                                    <div className="text-xs text-gray-400">{req.phone}</div>
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${statusStyles[req.status]}`}
                                    >
                                        {req.status === "waitlisted" && <Clock className="size-3" />}
                                        {statusLabels[req.status]}
                                    </span>
                                </td>
                                <td className="px-4 py-3 text-gray-500">
                                    {new Date(req.createdAt).toLocaleDateString("fr-FR")}
                                </td>
                                <td className="px-4 py-3">
                                    {(req.status === "pending" || req.status === "waitlisted") && (
                                        <div className="flex justify-end gap-2">
                                            <button
                                                onClick={() => handleAccept(req._id)}
                                                disabled={processingId === req._id}
                                                className="flex items-center gap-1 rounded-full bg-[#D6336C] px-3 py-1.5 text-xs font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                                            >
                                                <Check className="size-3.5" /> Accepter
                                            </button>
                                            <button
                                                onClick={() => handleReject(req._id)}
                                                disabled={processingId === req._id}
                                                className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50 disabled:opacity-50"
                                            >
                                                <X className="size-3.5" /> Rejeter
                                            </button>
                                        </div>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <CredentialsModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                credentials={credentials}
            />
        </>
    );
}