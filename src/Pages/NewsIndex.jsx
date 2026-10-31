import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CalendarDays, Newspaper } from "lucide-react";
import { newsApi } from "@/services/api";
import UpperHeader from "@/Components/UpperHeader";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

function dateLabel(value) {
  if (!value) return "Actualité";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "Actualité" : date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function NewsIndex() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    newsApi.getAll()
      .then(({ data }) => { if (active) setItems(Array.isArray(data) ? data : []); })
      .catch((e) => { if (active) setError(e.response?.data?.message || "Les actualités ne sont pas disponibles pour le moment."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const [featured, ...others] = items;

  return (
    <div className="min-h-screen bg-[#faf8f8]">
      <UpperHeader/><Header/>
      <main>
        <section className="bg-gradient-to-br from-[#D6336C] to-[#9d4c9c] px-5 py-16 text-white sm:py-20">
          <div className="mx-auto max-w-7xl">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-white/80">Solidarity Group · Le journal</p>
            <h1 className="mt-4 max-w-3xl font-fraunces text-4xl font-bold leading-tight sm:text-6xl">Nos actualités</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-white/90 sm:text-lg">Les nouvelles, les initiatives et les histoires qui font vivre notre engagement solidaire au Burkina Faso.</p>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
          {loading ? <p className="py-20 text-center text-gray-500">Chargement des actualités…</p> : error ? <p role="alert" className="rounded-2xl bg-red-50 p-5 text-center text-red-700">{error}</p> : !items.length ? (
            <div className="rounded-3xl border border-dashed border-gray-300 bg-white px-6 py-20 text-center"><Newspaper className="mx-auto text-[#D6336C]" size={36}/><h2 className="mt-4 text-xl font-bold text-gray-800">Aucune actualité pour le moment</h2><p className="mt-2 text-gray-500">Revenez bientôt découvrir nos prochaines publications.</p></div>
          ) : (
            <>
              {featured && <Link to={`/actualites/${featured.slug || featured._id}`} className="group grid overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-xl lg:grid-cols-2">
                <div className="relative min-h-64 bg-pink-100 lg:min-h-[410px]">{featured.imageUrl ? <img src={featured.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"/> : <div className="flex h-full items-center justify-center text-[#D6336C]"><Newspaper size={52}/></div>}<span className="absolute left-5 top-5 rounded-full bg-[#D6336C] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">À la une</span></div>
                <div className="flex flex-col justify-center p-7 sm:p-10"><span className="text-sm font-bold uppercase tracking-wider text-[#D6336C]">{featured.category || "Actualité"}</span><h2 className="mt-4 font-fraunces text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{featured.title}</h2><p className="mt-4 line-clamp-4 leading-7 text-gray-600">{featured.summary}</p><div className="mt-6 flex items-center gap-2 text-sm text-gray-400"><CalendarDays size={15}/>{dateLabel(featured.publishedAt || featured.createdAt)}</div><span className="mt-8 inline-flex items-center gap-2 font-semibold text-[#D6336C]">Lire l’article <ArrowRight size={17} className="transition group-hover:translate-x-1"/></span></div>
              </Link>}
              {others.length > 0 && <div className="mt-12"><div className="mb-6 flex items-end justify-between"><div><p className="text-sm font-semibold uppercase tracking-widest text-[#D6336C]">Toutes les publications</p><h2 className="mt-2 font-fraunces text-2xl font-bold text-gray-900 sm:text-3xl">À découvrir</h2></div><span className="text-sm text-gray-400">{items.length} article{items.length > 1 ? "s" : ""}</span></div><div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                {others.map((item) => <Link key={item._id} to={`/actualites/${item.slug || item._id}`} className="group overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"><div className="h-52 overflow-hidden bg-pink-100">{item.imageUrl ? <img src={item.imageUrl} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105"/> : <div className="flex h-full items-center justify-center text-[#D6336C]"><Newspaper size={36}/></div>}</div><div className="p-5"><span className="text-xs font-bold uppercase tracking-wider text-[#D6336C]">{item.category || "Actualité"}</span><h3 className="mt-3 line-clamp-2 text-xl font-bold leading-snug text-gray-900">{item.title}</h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">{item.summary}</p><div className="mt-5 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-400"><span>{dateLabel(item.publishedAt || item.createdAt)}</span><span className="inline-flex items-center gap-1 font-semibold text-[#D6336C]">Lire <ArrowRight size={14}/></span></div></div></Link>)}
              </div></div>}
            </>
          )}
        </section>
      </main>
      <Footer/>
    </div>
  );
}
