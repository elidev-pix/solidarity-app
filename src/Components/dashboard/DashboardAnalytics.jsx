import { useMemo, useState } from "react";
import { Activity, CalendarCheck, TrendingUp, Users, Wallet } from "lucide-react";

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
const money = (value) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(value || 0);

function EmptyChart({ message }) {
    return (
        <div className="flex h-52 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-gray-50/70 px-6 text-center text-sm text-gray-400">
            {message}
        </div>
    );
}

function ContributionsChart({ data }) {
    const [active, setActive] = useState(null);
    const values = data.map((item) => item.contributions || 0);
    const max = Math.max(...values, 1);
    const points = values.map((value, index) => ({
        x: 30 + (index * 540) / 11,
        y: 158 - (value / max) * 125,
        value,
        month: MONTHS[index],
    }));
    const line = points.map((point) => `${point.x},${point.y}`).join(" ");
    const area = `30,158 ${line} 570,158`;
    const current = active === null ? null : points[active];

    return (
        <div>
            <div className="relative">
                <svg viewBox="0 0 600 190" className="h-52 w-full overflow-visible" role="img" aria-label="Évolution mensuelle des cotisations">
                    <defs>
                        <linearGradient id="solidarityContributionGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#D6336C" stopOpacity=".24" />
                            <stop offset="100%" stopColor="#D6336C" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                    {[33, 75, 117, 158].map((y) => (
                        <line key={y} x1="30" x2="570" y1={y} y2={y} stroke="#EDEFF2" strokeDasharray="4 6" />
                    ))}
                    <polygon points={area} fill="url(#solidarityContributionGradient)" />
                    <polyline points={line} fill="none" stroke="#D6336C" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    {points.map((point, index) => (
                        <g key={point.month} onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)}>
                            <circle cx={point.x} cy={point.y} r="11" fill="transparent" />
                            <circle cx={point.x} cy={point.y} r={active === index ? 6 : 4} fill="#fff" stroke="#D6336C" strokeWidth="2.5" />
                        </g>
                    ))}
                    {MONTHS.map((month, index) => (
                        <text key={month} x={30 + (index * 540) / 11} y="181" textAnchor="middle" fontSize="10" fill="#9CA3AF">{month}</text>
                    ))}
                </svg>
                {current && (
                    <div className="pointer-events-none absolute right-2 top-1 rounded-xl border border-gray-100 bg-white px-3 py-2 shadow-lg">
                        <p className="text-xs font-medium text-gray-400">{current.month}</p>
                        <p className="text-sm font-bold text-gray-900">{money(current.value)} FCFA</p>
                    </div>
                )}
            </div>
            <div className="mt-1 flex items-center justify-between text-xs text-gray-400">
                <span>Janvier</span><span>Décembre</span>
            </div>
        </div>
    );
}

function CommunityChart({ data }) {
    const max = Math.max(...data.flatMap((item) => [item.newMembers || 0, item.participations || 0]), 1);
    return (
        <div>
            <div className="flex h-52 items-end gap-2 sm:gap-3">
                {data.map((item, index) => {
                    const members = item.newMembers || 0;
                    const participations = item.participations || 0;
                    return (
                        <div key={item.month || index} className="group flex min-w-0 flex-1 flex-col items-center justify-end gap-2">
                            <div className="flex h-40 w-full items-end justify-center gap-1">
                                <div
                                    title={`${members} nouveau(x) membre(s)`}
                                    className="w-[42%] max-w-4 rounded-t-md bg-[#B36CB2] transition-all duration-300 group-hover:brightness-110"
                                    style={{ height: `${Math.max((members / max) * 100, members ? 5 : 0)}%` }}
                                />
                                <div
                                    title={`${participations} participation(s)`}
                                    className="w-[42%] max-w-4 rounded-t-md bg-[#D6336C] transition-all duration-300 group-hover:brightness-110"
                                    style={{ height: `${Math.max((participations / max) * 100, participations ? 5 : 0)}%` }}
                                />
                            </div>
                            <span className="text-[10px] text-gray-400 sm:text-[11px]">{MONTHS[index]}</span>
                        </div>
                    );
                })}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-gray-100 pt-4 text-xs text-gray-500">
                <span className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-[#B36CB2]" />Nouveaux membres</span>
                <span className="flex items-center gap-2"><span className="size-2.5 rounded-sm bg-[#D6336C]" />Participations validées</span>
            </div>
        </div>
    );
}

export default function DashboardAnalytics({ monthlyStats = [], year }) {
    const data = useMemo(
        () => Array.from({ length: 12 }, (_, index) => monthlyStats.find((item) => item.month === index + 1) || {
            month: index + 1, contributions: 0, contributionCount: 0, participations: 0, newMembers: 0,
        }),
        [monthlyStats]
    );
    const totalMonthlyContributions = data.reduce((sum, item) => sum + (item.contributions || 0), 0);
    const totalNewMembers = data.reduce((sum, item) => sum + (item.newMembers || 0), 0);
    const totalMonthlyParticipations = data.reduce((sum, item) => sum + (item.participations || 0), 0);
    const hasContributionData = totalMonthlyContributions > 0;
    const hasCommunityData = totalNewMembers > 0 || totalMonthlyParticipations > 0;

    return (
        <section className="mt-8 space-y-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-[#D6336C]/[0.08] px-3 py-1 text-xs font-semibold text-[#D6336C]">
                        <Activity size={14} /> ANALYSE DE L'ACTIVITÉ
                    </div>
                    <h2 className="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">Les chiffres prennent vie.</h2>
                    <p className="mt-1 text-sm text-gray-500">Suivez l'évolution de la solidarité au fil des mois.</p>
                </div>
                <span className="w-fit rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-500">{year || new Date().getFullYear()}</span>
            </div>

            <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
                <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Wallet size={17} className="text-[#D6336C]" /> Cotisations collectées</div>
                            <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">{money(totalMonthlyContributions)} <span className="text-sm font-semibold text-gray-400">FCFA</span></p>
                            <p className="mt-1 text-xs text-gray-400">Cumul des versements enregistrés sur l'année</p>
                        </div>
                        <div className="rounded-xl bg-[#D6336C]/10 p-3 text-[#D6336C]"><TrendingUp size={20} /></div>
                    </div>
                    <div className="mt-5">
                        {hasContributionData ? <ContributionsChart data={data} /> : <EmptyChart message="Les données de cotisations apparaîtront ici dès les premiers versements de l'année." />}
                    </div>
                </article>

                <article className="overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Users size={17} className="text-[#B36CB2]" /> Engagement de la communauté</div>
                            <p className="mt-2 text-2xl font-bold tracking-tight text-gray-900">{totalNewMembers + totalMonthlyParticipations} <span className="text-sm font-semibold text-gray-400">actions</span></p>
                            <p className="mt-1 text-xs text-gray-400">Nouveaux membres et participations validées</p>
                        </div>
                        <div className="rounded-xl bg-[#B36CB2]/10 p-3 text-[#B36CB2]"><CalendarCheck size={20} /></div>
                    </div>
                    <div className="mt-5">
                        {hasCommunityData ? <CommunityChart data={data} /> : <EmptyChart message="L'activité de la communauté sera représentée ici au fur et à mesure des inscriptions et événements." />}
                    </div>
                </article>
            </div>
        </section>
    );
}
