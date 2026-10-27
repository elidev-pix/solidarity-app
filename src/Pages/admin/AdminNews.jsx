import { useEffect, useState } from "react";
import { newsApi, uploadApi } from "@/services/api";
import { Plus, Pencil, Trash2, X, Save, Newspaper } from "lucide-react";

const blank = { title: "", summary: "", content: "", category: "Humanitaire", imageUrl: "", isPublished: true };

export default function AdminNews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blank);
  const [error, setError] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const { data } = await newsApi.getAdminAll();
      setItems(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.response?.data?.message || "Impossible de charger les actualités.");
    } finally { setLoading(false); }
  }

  useEffect(() => { load(); }, []);

  function openCreate() {
    setEditing(null); setForm(blank); setError(""); setFormOpen(true);
  }
  function openEdit(item) {
    setEditing(item); setForm({
      title: item.title || "", summary: item.summary || "", content: item.content || "",
      category: item.category || "Actualité", imageUrl: item.imageUrl || "", isPublished: item.isPublished !== false,
    }); setError(""); setFormOpen(true);
  }
  function change(e) {
    const { name, value, type, checked } = e.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }
  async function uploadNewsImage(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError("Choisissez une image JPEG, PNG ou WebP de 5 Mo maximum.");
      e.target.value = "";
      return;
    }
    setUploadingImage(true); setError("");
    try {
      const { data } = await uploadApi.image(file);
      setForm((current) => ({ ...current, imageUrl: data.imageUrl }));
    } catch (e) {
      setError(e.response?.data?.message || "Échec de l’envoi de l’image.");
    } finally { setUploadingImage(false); e.target.value = ""; }
  }
  async function submit(e) {
    e.preventDefault(); setSaving(true); setError("");
    try {
      const payload = { ...form, title: form.title.trim(), imageUrl: form.imageUrl.trim() };
      if (editing) await newsApi.update(editing._id, payload);
      else await newsApi.create(payload);
      setFormOpen(false); await load();
    } catch (e) {
      setError(e.response?.data?.message || "Impossible d’enregistrer l’actualité.");
    } finally { setSaving(false); }
  }
  async function remove(item) {
    if (!window.confirm(`Supprimer l’actualité « ${item.title} » ? Cette action est définitive.`)) return;
    try { await newsApi.remove(item._id); await load(); }
    catch (e) { setError(e.response?.data?.message || "Impossible de supprimer l’actualité."); }
  }

  const inputClass = "w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm outline-none focus:border-[#D6336C]";

  return (
    <div className="p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><h1 className="font-fraunces text-2xl font-bold text-gray-800">Actualités</h1><p className="mt-1 text-sm text-gray-500">Publiez et gérez les actualités visibles sur la page d’accueil.</p></div>
        <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6336C] px-4 py-2.5 text-sm font-semibold text-white"><Plus size={16}/> Nouvelle actualité</button>
      </div>
      {error && !formOpen && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {loading ? <p className="text-sm text-gray-500">Chargement…</p> : items.map((item) => (
          <article key={item._id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {item.imageUrl ? <img src={item.imageUrl} alt="" className="h-40 w-full object-cover"/> : <div className="flex h-40 items-center justify-center bg-pink-50 text-[#D6336C]"><Newspaper size={32}/></div>}
            <div className="p-4"><div className="flex items-center justify-between gap-2"><span className="text-xs font-semibold uppercase text-[#D6336C]">{item.category || "Actualité"}</span><span className={item.isPublished ? "text-xs text-green-700" : "text-xs text-gray-500"}>{item.isPublished ? "Publiée" : "Brouillon"}</span></div><h2 className="mt-2 font-bold text-gray-800">{item.title}</h2><p className="mt-1 text-sm text-gray-500 line-clamp-3">{item.summary}</p><div className="mt-4 flex gap-2"><button onClick={() => openEdit(item)} className="inline-flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"><Pencil size={14}/> Modifier</button><button onClick={() => remove(item)} className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-2 text-sm text-red-600"><Trash2 size={14}/> Supprimer</button></div></div>
          </article>
        ))}
        {!loading && !items.length && <p className="text-sm text-gray-500">Aucune actualité pour le moment.</p>}
      </div>
      {formOpen && <div className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/50 p-4"><form onSubmit={submit} className="my-8 w-full max-w-2xl rounded-3xl bg-white p-6 shadow-xl"><div className="flex items-center justify-between"><h2 className="font-fraunces text-xl font-bold">{editing ? "Modifier l’actualité" : "Créer une actualité"}</h2><button type="button" onClick={() => setFormOpen(false)} aria-label="Fermer"><X/></button></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="space-y-1 text-sm font-medium sm:col-span-2">Titre *<input name="title" required maxLength={180} value={form.title} onChange={change} className={inputClass}/></label><label className="space-y-1 text-sm font-medium">Catégorie<input name="category" value={form.category} onChange={change} className={inputClass}/></label><label className="space-y-1 text-sm font-medium">URL de l’image (HTTP/HTTPS)<input name="imageUrl" type="url" value={form.imageUrl} onChange={change} className={inputClass} placeholder="https://…"/><input aria-label="Importer une image depuis votre appareil" type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadNewsImage} disabled={uploadingImage || saving} className={inputClass}/>{uploadingImage && <span className="text-xs text-gray-500">Envoi vers Appwrite…</span>}{form.imageUrl && <img src={form.imageUrl} alt="Aperçu de l’actualité" className="h-28 w-full rounded-lg object-cover"/>}</label><label className="space-y-1 text-sm font-medium sm:col-span-2">Résumé<textarea name="summary" rows={2} maxLength={500} value={form.summary} onChange={change} className={inputClass}/></label><label className="space-y-1 text-sm font-medium sm:col-span-2">Contenu détaillé<textarea name="content" rows={5} value={form.content} onChange={change} className={inputClass}/></label><label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" name="isPublished" checked={form.isPublished} onChange={change}/> Publier immédiatement</label></div>{error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<div className="mt-6 flex justify-end gap-3"><button type="button" onClick={() => setFormOpen(false)} className="rounded-full border px-4 py-2 text-sm">Annuler</button><button disabled={saving || uploadingImage} className="inline-flex items-center gap-2 rounded-full bg-[#D6336C] px-5 py-2 text-sm font-semibold text-white disabled:opacity-60"><Save size={15}/>{saving ? "Enregistrement…" : "Enregistrer"}</button></div></form></div>}
    </div>
  );
}
