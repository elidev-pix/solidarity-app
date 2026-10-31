import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { newsApi } from "../services/api.js";

function formatDate(value) {
  if (!value) return "";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? "" : date.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function News() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    newsApi.getAll()
      .then(({ data }) => { if (active) setItems(Array.isArray(data) ? data : []); })
      .catch((error) => console.error("Chargement des actualités impossible :", error))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const visible = items.filter((item) => item.isPublished !== false).slice(0, 4);
  const featured = visible[0];

  return (
    <div id="News">
      <div className="mb-2 text-center">
        <span className="font-semibold font-fraunces text-[#D6336C] text-3xl sm:text-4xl">Actualités</span>
      </div>
      <section className="flex justify-center items-center bg-[#D6336C] py-8 sm:py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-5 w-full max-w-6xl">
          {loading ? (
            <p className="w-full py-12 text-center text-white">Chargement des actualités…</p>
          ) : !featured ? (
            <p className="w-full rounded-2xl bg-white/10 px-6 py-12 text-center text-white">Aucune actualité publiée pour le moment.</p>
          ) : (
            <>
              <Link to={`/actualites/${featured.slug || featured._id}`} className="relative min-h-72 overflow-hidden rounded-3xl w-full lg:w-2/3 bg-black/20 group">
                {featured.imageUrl && <img src={featured.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="relative flex min-h-72 h-full flex-col justify-end p-5 sm:p-7">
                  <span className="w-fit rounded-full bg-[#D6336C] px-4 py-2 text-xs font-semibold text-white">{featured.category || "Actualité"}</span>
                  <h2 className="mt-4 max-w-lg text-xl sm:text-3xl font-bold text-white">{featured.title}</h2>
                  {featured.summary && <p className="mt-2 max-w-xl text-sm text-gray-100">{featured.summary}</p>}
                  <p className="mt-2 text-sm text-gray-200">{formatDate(featured.publishedAt || featured.createdAt)}</p>
                </div>
              </Link>
              <div className="flex w-full flex-col gap-4 lg:w-1/3">
                {visible.slice(1).map((item) => (
                  <Link key={item._id} to={`/actualites/${item.slug || item._id}`} className="flex min-h-28 sm:min-h-32 w-full overflow-hidden rounded-2xl bg-white transition hover:-translate-y-0.5 hover:shadow-lg">
                    {item.imageUrl ? <img src={item.imageUrl} alt="" className="w-24 sm:w-28 object-cover shrink-0" /> : <div className="w-24 sm:w-28 shrink-0 bg-pink-100" />}
                    <div className="flex min-w-0 flex-col justify-center p-3 sm:p-4">
                      <span className="text-xs font-semibold text-[#D6336C]">{item.category || "Actualité"}</span>
                      <h3 className="mt-1 text-sm font-bold line-clamp-2">{item.title}</h3>
                      <p className="mt-2 text-xs text-gray-500">{formatDate(item.publishedAt || item.createdAt)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default News;
