// Path: src/Pages/admin/AdminEvents.jsx
import { useEffect, useState } from "react";
import { eventApi } from "@/services/api";
import EventFormModal from "@/Components/admin/EventFormModal";
import EventParticipantsModal from "@/Components/admin/EventParticipantsModal";
import { Plus, Trash2, Pencil, Users } from "lucide-react";

const statusStyles = {
    upcoming: "bg-blue-50 text-blue-700",
    ongoing: "bg-green-50 text-green-700",
    completed: "bg-gray-100 text-gray-600",
    cancelled: "bg-red-50 text-red-700",
};

export default function AdminEvents() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formOpen, setFormOpen] = useState(false);
    const [participantsOpen, setParticipantsOpen] = useState(false);
    const [selected, setSelected] = useState(null);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const { data } = await eventApi.getAll();
            setEvents(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer cet événement ?")) return;
        try {
            await eventApi.remove(id);
            fetchEvents();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <h1 className="font-fraunces text-2xl font-bold text-gray-800">Événements</h1>
                <button
                    onClick={() => {
                        setSelected(null);
                        setFormOpen(true);
                    }}
                    className="flex items-center gap-2 rounded-full bg-[#D6336C] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
                >
                    <Plus className="size-4" /> Nouvel événement
                </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {!loading &&
                    events.map((ev) => (
                        <div key={ev._id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                            <div className="flex items-start justify-between">
                                <span className="font-fraunces text-lg font-bold text-gray-800">{ev.title}</span>
                                <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${statusStyles[ev.status]}`}>
                                    {ev.status}
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                                {new Date(ev.startDate).toLocaleString("fr-FR")}
                            </p>
                            {ev.location && <p className="mt-1 text-xs text-gray-400">{ev.location}</p>}
                            <p className="mt-2 line-clamp-2 text-sm text-gray-600">{ev.description}</p>

                            <div className="mt-4 flex gap-2">
                                <button
                                    onClick={() => {
                                        setSelected(ev);
                                        setParticipantsOpen(true);
                                    }}
                                    className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                                >
                                    <Users className="size-3.5" /> Participants
                                </button>
                                <button
                                    onClick={() => {
                                        setSelected(ev);
                                        setFormOpen(true);
                                    }}
                                    className="rounded-full border border-gray-200 p-1.5 text-gray-600 hover:bg-gray-50"
                                >
                                    <Pencil className="size-3.5" />
                                </button>
                                <button
                                    onClick={() => handleDelete(ev._id)}
                                    className="rounded-full border border-gray-200 p-1.5 text-red-600 hover:bg-red-50"
                                >
                                    <Trash2 className="size-3.5" />
                                </button>
                            </div>
                        </div>
                    ))}
            </div>

            <EventFormModal
                open={formOpen}
                onClose={() => setFormOpen(false)}
                onDone={fetchEvents}
                event={selected}
            />
            <EventParticipantsModal
                open={participantsOpen}
                onClose={() => setParticipantsOpen(false)}
                event={selected}
            />
        </div>
    );
}