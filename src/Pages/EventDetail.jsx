import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";
import { eventApi } from "@/services/api";
import UpperHeader from "@/Components/UpperHeader";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";
import NewsArticleBody from "@/Components/NewsArticleBody";

export default function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    eventApi.getById(id).then(({ data }) => { if (active) setEvent(data); })
      .catch((e) => { if (active) setError(e.response?.status === 404 ? "Cet événement n’existe pas ou n’est plus publié." : "Impossible de charger cet événement."); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);
  const date = event?.startDate ? new Date(event.startDate).toLocaleString("fr-FR", { dateStyle: "full", timeStyle: "short" }) : "";
  return <div className="min-h-screen bg-white"><UpperHeader/><Header/><main className="mx-auto max-w-4xl px-5 py-10 sm:py-16">
    <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#D6336C]"><ArrowLeft size={17}/> Accueil</Link>
    {loading ? <p className="py-24 text-center text-gray-500">Chargement de l’événement…</p> : error ? <p className="py-24 text-center text-xl font-bold text-gray-700">{error}</p> : event && <>
      <header className="mt-9"><span className="text-sm font-bold uppercase tracking-widest text-[#D6336C]">Événement Solidarity</span><h1 className="mt-4 font-fraunces text-3xl font-bold leading-tight text-gray-900 sm:text-5xl">{event.title}</h1>
      <div className="mt-6 flex flex-col gap-3 text-sm text-gray-500 sm:flex-row sm:gap-6"><span className="inline-flex items-center gap-2"><CalendarDays size={17}/>{date}</span><span className="inline-flex items-center gap-2"><MapPin size={17}/>{event.location || "Lieu à préciser"}</span></div></header>
      {event.imageUrl && <div className="mt-9 overflow-hidden rounded-3xl bg-gray-100"><img src={event.imageUrl} alt={event.title} className="max-h-[560px] w-full object-cover"/></div>}
      <article className="news-article-body mt-10"><NewsArticleBody contentJson={event.contentJson} content={event.description}/></article>
    </>}
  </main><Footer/></div>;
}
