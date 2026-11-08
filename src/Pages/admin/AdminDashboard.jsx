// Path: src/Pages/admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import { statsApi } from "@/services/api";
import { Users, ClipboardList, CalendarCheck, Wallet } from "lucide-react";
import DashboardAnalytics from "@/Components/dashboard/DashboardAnalytics";

const cards = [
    { key: "memberCount", label: "Membres", icon: Users, color: "#D6336C" },
    { key: "pendingRequests", label: "Demandes en attente", icon: ClipboardList, color: "#B36CB2" },
    { key: "totalParticipations", label: "Participations validées", icon: CalendarCheck, color: "#4285F4" },
    { key: "totalCollected", label: "Cotisations collectées", icon: Wallet, color: "#22c55e", suffix: " FCFA" },
];

export default function AdminDashboard() {
    const [stats, setStats] = useState(null);
    const [selectedYear, setSelectedYear] = useState(null);
    const [error, setError] = useState(false);

    useEffect(() => {
        let active = true;
        statsApi.get(selectedYear || undefined)
            .then(({ data }) => {
                if (active) {
                    setStats(data);
                    setError(false);
                }
            })
            .catch((err) => {
                console.error("Chargement des statistiques impossible :", err);
                if (active) setError(true);
            });
        return () => { active = false; };
    }, [selectedYear]);

    return (
        <div className="min-h-full bg-[#FAFAFC] p-5 sm:p-6 lg:p-8">
            <div className="mb-1 flex flex-wrap items-center justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#D6336C]">SOLIDARITY · ADMINISTRATION</p>
                    <h1 className="mt-2 font-fraunces text-2xl font-bold text-gray-900 sm:text-3xl">Tableau de bord</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        {stats ? `Votre organisation en un coup d'œil · ${stats.year}` : "Vue d'ensemble de votre organisation"}
                    </p>
                </div>
                <select aria-label="Année des statistiques" value={selectedYear ?? stats?.year ?? ""} onChange={(event) => setSelectedYear(Number(event.target.value))} className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-gray-700 shadow-sm outline-none focus:border-[#D6336C]">
                    {(stats?.availableYears || [stats?.currentYear || new Date().getFullYear()]).map((year) => <option key={year} value={year}>Données {year}</option>)}
                </select>
            </div>

            {error && (
                <div className="mt-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                    Impossible de charger les statistiques pour le moment. Actualisez la page ou réessayez plus tard.
                </div>
            )}

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {cards.map(({ key, label, icon: Icon, color, suffix }) => (
                    <div key={key} className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-gray-200/60">
                        <div className="flex items-center justify-between">
                            <div
                                className="flex size-11 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110"
                                style={{ backgroundColor: `${color}1A` }}
                            >
                                <Icon className="size-5" style={{ color }} />
                            </div>
                            <span className="rounded-full bg-gray-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-400">Global</span>
                        </div>
                        <p className="mt-5 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {stats ? `${(stats[key] ?? 0).toLocaleString("fr-FR")}${suffix || ""}` : "—"}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">{label}</p>
                    </div>
                ))}
            </div>

            {stats && <DashboardAnalytics monthlyStats={stats.monthlyStats || []} year={stats.year} />}
        </div>
    );
}
