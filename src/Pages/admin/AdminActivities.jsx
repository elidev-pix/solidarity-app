import { useEffect, useState } from "react";
import { activityApi } from "@/services/api";
import { Activity, ChevronLeft, ChevronRight, Filter } from "lucide-react";

const labels = { LOGIN: "Connexion", CREATE: "Création", UPDATE: "Modification", DELETE: "Suppression", PUBLISH: "Publication", UNPUBLISH: "Dépublication" };
const dateLabel = (value) => new Date(value).toLocaleString("fr-FR", { dateStyle: "medium", timeStyle: "short" });

export default function AdminActivities() {
  const [data, setData] = useState({ items: [], total: 0, page: 1, pages: 1 });
  const [filters, setFilters] = useState({ action: "", entity: "", from: "", to: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  async function load(page = 1) {
    setLoading(true); setError("");
    try { const response = await activityApi.getAll({ ...filters, page, limit: 25 }); setData(response.data); }
    catch (e) { setError(e.response?.data?.message || "Impossible de charger le journal."); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(1); }, []);
  function change(e) { setFilters((current) => ({ ...current, [e.target.name]: e.target.value })); }
  return <div className="min-w-0 p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"><div><h1 className="font-fraunces text-2xl font-bold text-gray-800">Journal des activités</h1><p className="mt-1 text-sm text-gray-500">Historique des actions effectuées dans l’administration.</p></div><span className="text-sm text-gray-500">{data.total} action(s)</span></div>
    <div className="mt-6 grid gap-3 rounded-2xl border border-gray-100 bg-white p-4 sm:grid-cols-2 lg:grid-cols-5">
      <label className="text-xs font-semibold text-gray-500">Action<select name="action" value={filters.action} onChange={change} className="mt-1 w-full rounded-lg border p-2 text-sm"><option value="">Toutes</option>{Object.entries(labels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
      <label className="text-xs font-semibold text-gray-500">Type<select name="entity" value={filters.entity} onChange={change} className="mt-1 w-full rounded-lg border p-2 text-sm"><option value="">Tous</option><option value="event">Événements</option><option value="auth">Authentification</option></select></label>
      <label className="text-xs font-semibold text-gray-500">Du<input type="date" name="from" value={filters.from} onChange={change} className="mt-1 w-full rounded-lg border p-2 text-sm"/></label>
      <label className="text-xs font-semibold text-gray-500">Au<input type="date" name="to" value={filters.to} onChange={change} className="mt-1 w-full rounded-lg border p-2 text-sm"/></label>
      <button onClick={() => load(1)} className="inline-flex items-center justify-center gap-2 self-end rounded-full bg-[#D6336C] px-4 py-2 text-sm font-semibold text-white"><Filter size={15}/> Filtrer</button>
    </div>
    {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <div className="mt-5 overflow-hidden rounded-2xl border border-gray-100 bg-white">
      {loading ? <p className="p-6 text-sm text-gray-500">Chargement…</p> : data.items.length ? <div className="divide-y divide-gray-100">{data.items.map((item) => <div key={item._id} className="flex gap-3 p-4"><span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-50 text-[#D6336C]"><Activity size={17}/></span><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><strong className="text-sm text-gray-800">{item.summary}</strong><span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-semibold text-gray-600">{labels[item.action] || item.action}</span></div><p className="mt-1 text-xs text-gray-500">{item.actor?.fullName || "Administrateur inconnu"} · {item.actorRole || item.actor?.role || "admin"} · {item.entity}</p><p className="mt-1 text-xs text-gray-400">{dateLabel(item.createdAt)}</p></div></div>)}</div> : <p className="p-8 text-center text-sm text-gray-500">Aucune activité pour ces filtres.</p>}
    </div>
    <div className="mt-4 flex items-center justify-between"><span className="text-xs text-gray-500">Page {data.page} / {Math.max(1, data.pages)}</span><div className="flex gap-2"><button disabled={loading || data.page <= 1} onClick={() => load(data.page - 1)} className="rounded-full border p-2 disabled:opacity-40" aria-label="Page précédente"><ChevronLeft size={17}/></button><button disabled={loading || data.page >= data.pages} onClick={() => load(data.page + 1)} className="rounded-full border p-2 disabled:opacity-40" aria-label="Page suivante"><ChevronRight size={17}/></button></div></div>
  </div>;
}
