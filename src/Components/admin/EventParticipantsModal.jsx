// Path: src/Components/admin/EventParticipantsModal.jsx
import { useEffect, useState } from "react";
import { participationApi } from "@/services/api";
import { X, Check, XCircle } from "lucide-react";

const statusLabels = {
    registered: "Inscrit",
    unavailable: "Indisponible",
    attended: "Présent",
    absent: "Absent",
};

export default function EventParticipantsModal({ open, onClose, event }) {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchParticipants = async () => {
        if (!event) return;
        setLoading(true);
        try {
            const { data } = await participationApi.getForEvent(event._id);
            setParticipants(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (open) fetchParticipants();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open, event]);

    if (!open || !event) return null;

    const handleValidate = async (id, status) => {
        try {
            await participationApi.validate(id, status);
            fetchParticipants();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                    <X className="size-5" />
                </button>

                <span className="font-semibold font-fraunces text-[#D6336C] text-2xl">{event.title}</span>
                <p className="mt-1 text-sm text-gray-500">Participants</p>

                <div className="mt-4 max-h-80 space-y-2 overflow-y-auto">
                    {!loading && participants.length === 0 && (
                        <p className="text-sm text-gray-400">Aucune inscription.</p>
                    )}
                    {participants.map((p) => (
                        <div
                            key={p._id}
                            className="flex items-center justify-between rounded-xl border border-gray-100 p-3"
                        >
                            <div>
                                <p className="text-sm font-medium text-gray-800">{p.user?.fullName}</p>
                                <p className="text-xs text-gray-500">
                                    {p.user?.memberId} — {statusLabels[p.status]}
                                </p>
                            </div>
                            {p.status === "registered" && (
                                <div className="flex gap-1.5">
                                    <button
                                        onClick={() => handleValidate(p._id, "attended")}
                                        className="rounded-full bg-green-50 p-1.5 text-green-600 hover:bg-green-100"
                                        title="Présent"
                                    >
                                        <Check className="size-4" />
                                    </button>
                                    <button
                                        onClick={() => handleValidate(p._id, "absent")}
                                        className="rounded-full bg-red-50 p-1.5 text-red-600 hover:bg-red-100"
                                        title="Absent"
                                    >
                                        <XCircle className="size-4" />
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}