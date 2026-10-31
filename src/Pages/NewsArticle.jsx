import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, Newspaper } from "lucide-react";
import { newsApi } from "@/services/api";
import UpperHeader from "@/Components/UpperHeader";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import NewsArticleBody from "@/Components/NewsArticleBody";

function dateLabel(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export default function NewsArticle() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    setLoading(true);
    newsApi.getBySlug(slug)
      .then(({ data }) => { if (active) setItem(data); })
      .catch((e) => { if (active) setError(e.response?.status === 404 ? "Cette actualité n’existe pas ou n’est plus publiée." : "Impossible de charger cet article."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [slug]);

  return (
    <div className="min-h-screen bg-white"><UpperHeader/><Header/>
      <main className="mx-auto max-w-4xl px-5 py-10 sm:py-16">
        <Link to="/actualites" className="inline-flex items-center gap-2 text-sm font-semibold text-[#D6336C] hover:gap-3"><ArrowLeft size={17}/> Toutes les actualités</Link>
        {loading ? <p className="py-24 text-center text-gray-500">Chargement de l’article…</p> : error ? <div className="py-24 text-center"><Newspaper className="mx-auto text-[#D6336C]" size={40}/><h1 className="mt-4 text-2xl font-bold text-gray-800">{error}</h1><Link to="/actualites" className="mt-6 inline-block rounded-full bg-[#D6336C] px-6 py-3 font-semibold text-white">Retour aux actualités</Link></div> : item && <>
          <header className="mt-9"><span className="text-sm font-bold uppercase tracking-widest text-[#D6336C]">{item.category || "Actualité"}</span><h1 className="mt-4 font-fraunces text-3xl font-bold leading-tight text-gray-900 sm:text-5xl">{item.title}</h1>{item.summary && <p className="mt-5 text-lg leading-8 text-gray-600 sm:text-xl">{item.summary}</p>}<div className="mt-6 flex items-center gap-2 text-sm text-gray-400"><CalendarDays size={16}/>{dateLabel(item.publishedAt || item.createdAt)}</div></header>
          {item.imageUrl && <div className="mt-9 overflow-hidden rounded-3xl bg-gray-100"><img src={item.imageUrl} alt={item.title} className="max-h-[560px] w-full object-cover"/></div>}
          <article className="mt-10"><NewsArticleBody contentJson={item.contentJson} content={item.content}/></article>
          <div className="mt-14 border-t border-gray-100 pt-8"><Link to="/actualites" className="inline-flex items-center gap-2 rounded-full border border-[#D6336C]/30 px-5 py-3 text-sm font-semibold text-[#D6336C] hover:bg-pink-50"><ArrowLeft size={16}/> Retour au journal</Link></div>
        </>}
      </main><Footer/>
    </div>
  );
}
