// Path: src/Pages/member/MemberActivities.jsx
import { useEffect, useState } from "react";
import { eventApi, participationApi, initiativeApi } from "@/services/api";
import { Calendar, MapPin, Lightbulb } from "lucide-react";

export default function MemberActivities() {
    const [events, setEvents] = useState([]);
    const [myParticipations, setMyParticipations] = useState([]);
    const [initiativeCount, setInitiativeCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchAll = async () => {
        setLoading(true);
        try {
            const [evRes, partRes, initRes] = await Promise.all([
                eventApi.getAll(),
                participationApi.getMine(),
                initiativeApi.getMine(),
            ]);
            setEvents(evRes.data);
            setMyParticipations(partRes.data);
            setInitiativeCount(initRes.data.length);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAll();
    }, []);

    const getMyStatus = (eventId) =>
        myParticipations.find((p) => p.event?._id === eventId)?.status;

    const handleRegister = async (eventId) => {
        await participationApi.register(eventId);
        fetchAll();
    };

    const handleUnavailable = async (eventId) => {
        await participationApi.markUnavailable(eventId);
        fetchAll();
    };

    const upcoming = events.filter((e) => e.status === "upcoming" || e.status === "ongoing");
    const history = myParticipations.filter((p) => p.status === "attended" || p.status === "absent");

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <h1 className="font-fraunces text-2xl font-bold text-gray-800">Mes activités</h1>
                <div className="flex items-center gap-2 rounded-full bg-[#D6336C]/10 px-4 py-2 text-sm font-semibold text-[#D6336C]">
                    <Lightbulb className="size-4" /> {initiativeCount} initiative(s) proposée(s)
                </div>
            </div>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-gray-500">À venir</h2>
            <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {!loading &&
                    upcoming.map((ev) => {
                        const status = getMyStatus(ev._id);
                        return (
                            <div key={ev._id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                                <span className="font-fraunces text-lg font-bold text-gray-800">{ev.title}</span>
                                <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                    <Calendar className="size-3.5" /> {new Date(ev.startDate).toLocaleString("fr-FR")}
                                </p>
                                {ev.location && (
                                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                                        <MapPin className="size-3.5" /> {ev.location}
                                    </p>
                                )}
                                <p className="mt-2 line-clamp-2 text-sm text-gray-600">{ev.description}</p>

                                {!status && (
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => handleRegister(ev._id)}
                                            className="rounded-full bg-[#D6336C] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                                        >
                                            S'inscrire
                                        </button>
                                        <button
                                            onClick={() => handleUnavailable(ev._id)}
                                            className="rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-600 hover:bg-gray-50"
                                        >
                                            Indisponible
                                        </button>
                                    </div>
                                )}
                                {status && (
                                    <p className="mt-4 text-xs font-semibold text-[#D6336C]">
                                        Statut : {status === "registered" ? "Inscrit" : "Indisponible"}
                                    </p>
                                )}
                            </div>
                        );
                    })}
                {!loading && upcoming.length === 0 && (
                    <p className="text-sm text-gray-400">Aucun événement à venir.</p>
                )}
            </div>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-wide text-gray-500">Historique</h2>
            <div className="mt-3 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                        <tr>
                            <th className="px-4 py-3">Événement</th>
                            <th className="px-4 py-3">Date</th>
                            <th className="px-4 py-3">Résultat</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {history.map((p) => (
                            <tr key={p._id}>
                                <td className="px-4 py-3 font-medium text-gray-800">{p.event?.title}</td>
                                <td className="px-4 py-3 text-gray-500">
                                    {new Date(p.event?.startDate).toLocaleDateString("fr-FR")}
                                </td>
                                <td className="px-4 py-3">
                                    <span
                                        className={
                                            p.status === "attended"
                                                ? "font-semibold text-green-600"
                                                : "font-semibold text-red-500"
                                        }
                                    >
                                        {p.status === "attended" ? "Présent" : "Absent"}
                                    </span>
                                </td>
                            </tr>
                        ))}
                        {history.length === 0 && (
                            <tr>
                                <td colSpan={3} className="px-4 py-3 text-gray-400">
                                    Aucun historique.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
