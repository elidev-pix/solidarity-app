import { useEffect, useMemo, useState } from "react";
import { eventApi, uploadApi } from "@/services/api";
import NewsEditor from "@/Components/NewsEditor";
import NewsArticleBody from "@/Components/NewsArticleBody";
import { X, Eye, Pencil, Save } from "lucide-react";

const empty = { title: "", description: "", contentJson: { type: "doc", content: [{ type: "paragraph" }] }, location: "", startDate: "", endDate: "", status: "upcoming", imageUrl: "", isPublished: true };
const inputClass = "w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none";

function legacyDocument(text = "") {
  return { type: "doc", content: text.split(/\n+/).filter(Boolean).map((line) => ({ type: "paragraph", content: [{ type: "text", text: line }] })) };
}

export default function EventFormModal({ open, onClose, onDone, event }) {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!open) return;
    setPreview(false);
    setError("");
    setForm(event ? {
      ...empty,
      title: event.title || "",
      description: event.description || "",
      contentJson: event.contentJson || legacyDocument(event.description || ""),
      location: event.location || "",
      startDate: event.startDate ? event.startDate.slice(0, 16) : "",
      endDate: event.endDate ? event.endDate.slice(0, 16) : "",
      status: event.status || "upcoming",
      imageUrl: event.imageUrl || "",
      isPublished: event.isPublished !== false,
    } : { ...empty, contentJson: legacyDocument("") });
  }, [event, open]);

  const previewDate = useMemo(() => form.startDate ? new Date(form.startDate).toLocaleString("fr-FR") : "", [form.startDate]);
  if (!open) return null;

  function change(e) {
    const { name, value, type, checked } = e.target;
    setForm((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  async function uploadCover(e) {
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
    e.preventDefault();
    if (uploadingImage) return;
    setLoading(true); setError("");
    try {
      const payload = { ...form, title: form.title.trim(), description: form.description.trim() };
      if (event) await eventApi.update(event._id, payload);
      else await eventApi.create(payload);
      await onDone?.();
      onClose();
    } catch (e) {
      setError(e.response?.data?.message || "Erreur lors de l’enregistrement de l’événement.");
    } finally { setLoading(false); }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/50 p-3 sm:p-6">
      <form onSubmit={submit} className="my-4 w-full max-w-5xl rounded-3xl bg-white p-5 shadow-xl sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <div><h2 className="font-fraunces text-xl font-bold text-gray-800">{event ? "Modifier l’événement" : "Créer un événement"}</h2><p className="mt-1 text-xs text-gray-500">Un éditeur complet, comme celui du magazine.</p></div>
          <button type="button" onClick={onClose} aria-label="Fermer" className="rounded-full p-2 hover:bg-gray-100"><X/></button>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <label className="space-y-1 text-sm font-medium sm:col-span-2">Titre *<input name="title" required maxLength={180} value={form.title} onChange={change} className={inputClass} placeholder="Titre de l’événement"/></label>
          <label className="space-y-1 text-sm font-medium">Lieu<input name="location" value={form.location} onChange={change} className={inputClass} placeholder="Lieu de l’événement"/></label>
          <label className="space-y-1 text-sm font-medium">Statut<select name="status" value={form.status} onChange={change} className={inputClass}><option value="upcoming">À venir</option><option value="ongoing">En cours</option><option value="completed">Terminé</option><option value="cancelled">Annulé</option></select></label>
          <label className="space-y-1 text-sm font-medium">Date et heure de début *<input type="datetime-local" name="startDate" required value={form.startDate} onChange={change} className={inputClass}/></label>
          <label className="space-y-1 text-sm font-medium">Date et heure de fin<input type="datetime-local" name="endDate" value={form.endDate} onChange={change} className={inputClass}/></label>
          <div className="space-y-2 text-sm font-medium sm:col-span-2">Image de couverture
            <input type="url" name="imageUrl" value={form.imageUrl} onChange={change} className={inputClass} placeholder="URL Appwrite ou https://…"/>
            <label className="block text-xs text-gray-500">Ou importer une image JPEG, PNG ou WebP (5 Mo maximum)</label>
            <input type="file" accept="image/jpeg,image/png,image/webp" onChange={uploadCover} disabled={uploadingImage || loading} className={inputClass}/>
            {uploadingImage && <p className="text-xs text-[#D6336C]">Envoi vers Appwrite…</p>}
            {form.imageUrl && <img src={form.imageUrl} alt="Aperçu de couverture" className="h-40 w-full rounded-xl object-cover"/>}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <div className="flex flex-wrap items-center justify-between gap-2"><label className="text-sm font-semibold">Description détaillée</label><button type="button" onClick={() => setPreview((v) => !v)} className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-[#D6336C]">{preview ? <><Pencil size={14}/> Modifier le contenu</> : <><Eye size={14}/> Prévisualiser</>}</button></div>
            {preview ? <div className="rounded-2xl border border-gray-200 p-5"><h3 className="font-fraunces text-2xl font-bold">{form.title || "Titre de l’événement"}</h3><p className="mt-2 text-sm text-gray-500">{previewDate} {form.location ? " • " + form.location : ""}</p>{form.imageUrl && <img src={form.imageUrl} alt="" className="mt-4 max-h-80 w-full rounded-xl object-cover"/>}<article className="news-article-body mt-5"><NewsArticleBody contentJson={form.contentJson} content={form.description}/></article></div> : <NewsEditor value={form.contentJson} onChange={(contentJson, description) => setForm((current) => ({ ...current, contentJson, description }))}/>}
          </div>
          <label className="flex items-center gap-2 text-sm sm:col-span-2"><input type="checkbox" name="isPublished" checked={form.isPublished} onChange={change}/> Publier immédiatement (décocher pour enregistrer en brouillon)</label>
        </div>
        {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
        <div className="mt-6 flex flex-col-reverse justify-end gap-3 sm:flex-row"><button type="button" onClick={onClose} className="rounded-full border px-4 py-2 text-sm">Annuler</button><button disabled={loading || uploadingImage} className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D6336C] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"><Save size={15}/>{loading ? "Enregistrement…" : form.isPublished ? "Enregistrer et publier" : "Enregistrer le brouillon"}</button></div>
      </form>
    </div>
  );
}
