import { useEffect, useMemo, useState } from "react";
import { CalendarCheck, Wallet, Lightbulb, Users, TrendingUp, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext.jsx";
import { eventApi, participationApi, contributionApi, initiativeApi } from "@/services/api";
import StatCard from "@/Components/dashboard/StatCard.jsx";

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
const money = (value) => new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(value || 0);

function MiniBars({ values, color = "#D6336C" }) {
  const max = Math.max(...values, 1);
  return <div className="flex h-36 items-end gap-2">{values.map((value, index) => <div key={index} className="flex min-w-0 flex-1 flex-col items-center justify-end gap-2"><div className="flex h-28 w-full items-end"><div title={`${money(value)}`} className="w-full rounded-t-md transition-all" style={{ height: `${value ? Math.max((value / max) * 100, 5) : 0}%`, background: color }} /></div><span className="text-[10px] text-gray-400">{MONTHS[index]}</span></div>)}</div>;
}

function MemberDashboard() {
  const { session } = useAuth();
  const [dashboard, setDashboard] = useState({ events: [], participations: [], contributions: null, initiatives: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const year = new Date().getFullYear();
  const [contributionYear, setContributionYear] = useState(year);

  useEffect(() => {
    let active = true;
    Promise.all([
      eventApi.getAll(),
      participationApi.getMine(),
      contributionApi.getMine(),
      initiativeApi.getMine(),
    ]).then(([events, participations, contributions, initiatives]) => {
      if (!active) return;
      setContributionYear(contributions.data.year || year);
      setDashboard({
        events: Array.isArray(events.data) ? events.data : [],
        participations: Array.isArray(participations.data) ? participations.data : [],
        contributions: contributions.data,
        initiatives: Array.isArray(initiatives.data) ? initiatives.data : [],
      });
    }).catch((requestError) => {
      console.error("Chargement du dashboard membre impossible :", requestError);
      if (active) setError("Certaines informations n'ont pas pu être chargées. Actualisez la page pour réessayer.");
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [year]);

  const monthly = useMemo(() => {
    const values = Array(12).fill(0);
    (dashboard.contributions?.history || []).forEach((contribution) => {
      const date = new Date(contribution.paidAt || contribution.createdAt);
      if (!Number.isNaN(date.getTime())) values[date.getMonth()] += Number(contribution.amount || 0);
    });
    return values;
  }, [dashboard.contributions]);

  const activityMonthly = useMemo(() => {
    const values = Array(12).fill(0);
    dashboard.participations.forEach((participation) => {
      const date = new Date(participation.validatedAt || participation.createdAt);
      if (!Number.isNaN(date.getTime()) && date.getFullYear() === year && participation.status === "attended") values[date.getMonth()] += 1;
    });
    return values;
  }, [dashboard.participations, year]);

  const upcomingEvents = dashboard.events.filter((event) => event.status !== "cancelled" && event.status !== "completed" && new Date(event.startDate) >= new Date()).length;
  const totalPaid = dashboard.contributions?.totalPaid || 0;
  const participationCount = dashboard.participations.filter((participation) => participation.status === "attended").length;
  const userName = session?.user?.fullName || "Membre";

  return (
    <div className="min-w-0 space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#D6336C] to-[#B36CB2] p-6 text-white shadow-lg sm:p-8">
        <div className="relative z-10"><p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/75">ESPACE MEMBRE</p><h2 className="mt-2 text-2xl font-bold sm:text-3xl">Bonjour, {userName} 👋</h2><p className="mt-2 max-w-lg text-sm leading-6 text-white/90">Retrouvez en un coup d'œil vos activités, vos cotisations et votre engagement au sein de Solidarity Group.</p></div>
        <div className="pointer-events-none absolute -right-8 -top-12 size-52 rounded-full border-[28px] border-white/10"/><div className="pointer-events-none absolute -bottom-20 right-24 size-48 rounded-full bg-white/10 blur-2xl"/>
      </div>

      {error && <p role="alert" className="rounded-xl border border-amber-100 bg-amber-50 p-3 text-sm text-amber-800">{error}</p>}

      <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-36 animate-pulse rounded-2xl bg-white" />
          ))
        ) : (<>
          <StatCard icon={CalendarCheck} label="Activités à venir" value={upcomingEvents}/>
          <StatCard icon={Users} label="Participations validées" value={participationCount}/>
          <StatCard icon={Wallet} label="Cotisations versées" value={`${money(totalPaid)} FCFA`}/>
          <StatCard icon={Lightbulb} label="Mes initiatives" value={dashboard.initiatives.length}/>
        </>)}
      </div>

      <section className="space-y-4">
        <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#D6336C]">MON ENGAGEMENT</p><h2 className="mt-1 text-xl font-bold text-gray-900">Mon activité en chiffres</h2><p className="mt-1 text-sm text-gray-500">Votre progression personnelle sur l'année {year}.</p></div>
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <article className="min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-3"><div><div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Wallet size={17} className="text-[#D6336C]"/>Mes cotisations</div><p className="mt-2 text-2xl font-bold text-gray-900">{money(totalPaid)} <span className="text-sm font-semibold text-gray-400">FCFA</span></p><p className="mt-1 text-xs text-gray-400">Versements mensuels en {contributionYear}</p></div><span className="rounded-xl bg-[#D6336C]/10 p-3 text-[#D6336C]"><TrendingUp size={20}/></span></div><div className="mt-6">{loading ? <div className="h-36 animate-pulse rounded-xl bg-gray-50"/> : <MiniBars values={monthly}/>}</div></article>
          <article className="min-w-0 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6"><div className="flex items-start justify-between gap-3"><div><div className="flex items-center gap-2 text-sm font-semibold text-gray-700"><Activity size={17} className="text-[#B36CB2]"/>Mes participations</div><p className="mt-2 text-2xl font-bold text-gray-900">{participationCount} <span className="text-sm font-semibold text-gray-400">participation(s)</span></p><p className="mt-1 text-xs text-gray-400">Présences validées par mois</p></div><span className="rounded-xl bg-[#B36CB2]/10 p-3 text-[#B36CB2]"><CalendarCheck size={20}/></span></div><div className="mt-6">{loading ? <div className="h-36 animate-pulse rounded-xl bg-gray-50"/> : <MiniBars values={activityMonthly} color="#B36CB2"/>}</div></article>
        </div>
      </section>
    </div>
  );
}

export default MemberDashboard;