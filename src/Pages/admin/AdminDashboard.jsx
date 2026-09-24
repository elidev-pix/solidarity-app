// Path: src/Pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { statsApi } from "@/services/api";
import { Users, ClipboardList, CalendarCheck, Wallet } from "lucide-react";

const cards = [
    { key: "memberCount", label: "Membres", icon: Users, color: "#D6336C" },
    { key: "pendingRequests", label: "Demandes en attente", icon: ClipboardList, color: "#B36CB2" },
    { key: "totalParticipations", label: "Participations validées", icon: CalendarCheck, color: "#4285F4" },
    { key: "totalCollected", label: "Cotisations collectées", icon: Wallet, color: "#22c55e", suffix: " FCFA" },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        statsApi.get().then(({ data }) => setStats(data)).catch(console.error);
    }, []);

    return (
        <div className="p-6">
            <h1 className="font-fraunces text-2xl font-bold text-gray-800">Tableau de bord</h1>
            <p className="mt-1 text-sm text-gray-500">
                {stats ? `Année ${stats.year}` : "Chargement..."}
            </p>

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {cards.map(({ key, label, icon: Icon, color, suffix }) => (
                    <div key={key} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
                        <div
                            className="flex size-10 items-center justify-center rounded-xl"
                            style={{ backgroundColor: `${color}1A` }}
                        >
                            <Icon className="size-5" style={{ color }} />
                        </div>
                        <p className="mt-4 text-2xl font-bold text-gray-800">
                            {stats ? `${stats[key].toLocaleString("fr-FR")}${suffix || ""}` : "—"}
                        </p>
                        <p className="text-sm text-gray-500">{label}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}