import { useCallback, useEffect, useState } from "react";
import { eventApi } from "@/services/api";
import EventFormModal from "@/Components/admin/EventFormModal";
import EventParticipantsModal from "@/Components/admin/EventParticipantsModal";
import { Plus, Trash2, Pencil, Users, CalendarDays, MapPin } from "lucide-react";

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

    const fetchEvents = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await eventApi.getAdminAll();
            setEvents(Array.isArray(data) ? data : []);
        } catch (error) {
            console.error(error);
        } finally { setLoading(false); }
    }, []);

    useEffect(() => { fetchEvents(); }, [fetchEvents]);

    async function handleDelete(event) {
        if (!window.confirm(`Supprimer l'événement « ${event.title} » ?`)) return;
        try {
            await eventApi.remove(event._id);
            await fetchEvents();
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Impossible de supprimer cet événement.");
        }
    }

    return (
        <div className="min-w-0 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D6336C]">VIE DE L'ASSOCIATION</p><h1 className="mt-1 font-fraunces text-2xl font-bold text-gray-900 sm:text-3xl">Événements</h1><p className="mt-1 text-sm text-gray-500">Créez, publiez et suivez les événements de Solidarity.</p></div>
                <button onClick={() => { setSelected(null); setFormOpen(true); }} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D6336C] px-4 py-3 text-sm font-semibold text-white hover:bg-[#B36CB2] sm:w-auto"><Plus size={17}/> Nouvel événement</button>
            </div>

            {loading ? <div className="mt-6 rounded-2xl bg-white p-8 text-center text-sm text-gray-500">Chargement des événements…</div> : events.length === 0 ? <div className="mt-6 rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">Aucun événement enregistré pour le moment.</div> : (
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {events.map((ev) => (
                        <article key={ev._id} className="min-w-0 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                            {ev.imageUrl ? <img src={ev.imageUrl} alt={ev.title} loading="lazy" className="h-44 w-full object-cover"/> : <div className="flex h-44 items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 text-sm text-gray-400">Aucune image de couverture</div>}
                            <div className="p-4 sm:p-5">
                                <div className="flex items-start justify-between gap-2"><h2 className="min-w-0 break-words font-fraunces text-lg font-bold text-gray-900">{ev.title}</h2><span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${statusStyles[ev.status] || "bg-gray-100 text-gray-600"}`}>{({ upcoming: "À venir", ongoing: "En cours", completed: "Terminé", cancelled: "Annulé" })[ev.status] || ev.status}</span></div>
                                <p className="mt-3 flex items-center gap-2 text-xs text-gray-500"><CalendarDays size={14} className="shrink-0"/>{new Date(ev.startDate).toLocaleString("fr-FR")}</p>
                                {ev.location && <p className="mt-2 flex items-center gap-2 text-xs text-gray-500"><MapPin size={14} className="shrink-0"/>{ev.location}</p>}
                                <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-600">{ev.description}</p>
                                <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${ev.isPublished === false ? "bg-amber-50 text-amber-700" : "bg-green-50 text-green-700"}`}>{ev.isPublished === false ? "Brouillon" : "Publié"}</span>
                                <div className="mt-4 grid grid-cols-[1fr_auto_auto] gap-2 border-t border-gray-100 pt-4">
                                    <button onClick={() => { setSelected(ev); setParticipantsOpen(true); }} className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-2 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-50"><Users size={14}/> Participants</button>
                                    <button onClick={() => { setSelected(ev); setFormOpen(true); }} aria-label="Modifier l'événement" className="rounded-lg border border-gray-200 p-2 text-gray-600 hover:border-[#D6336C] hover:text-[#D6336C]"><Pencil size={15}/></button>
                                    <button onClick={() => handleDelete(ev)} aria-label="Supprimer l'événement" className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50"><Trash2 size={15}/></button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            )}

            <EventFormModal open={formOpen} onClose={() => setFormOpen(false)} onDone={fetchEvents} event={selected}/>
            <EventParticipantsModal open={participantsOpen} onClose={() => setParticipantsOpen(false)} event={selected}/>
        </div>
    );
}