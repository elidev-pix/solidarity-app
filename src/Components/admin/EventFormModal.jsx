// Path: src/Components/admin/EventFormModal.jsx
import { useEffect, useState } from "react";
import { eventApi, uploadApi } from "@/services/api";
import { X } from "lucide-react";

const empty = { title: "", description: "", location: "", startDate: "", endDate: "", status: "upcoming", imageUrl: "" };

export default function EventFormModal({ open, onClose, onDone, event }) {
    const [form, setForm] = useState(empty);
    const [loading, setLoading] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        if (event) {
            setForm({
                title: event.title || "",
                description: event.description || "",
                location: event.location || "",
                startDate: event.startDate ? event.startDate.slice(0, 16) : "",
                endDate: event.endDate ? event.endDate.slice(0, 16) : "",
                status: event.status || "upcoming",
                imageUrl: event.imageUrl || "",
            });
        } else {
            setForm(empty);
        }
    }, [event, open]);

    if (!open) return null;

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
            alert("Formats autorisés : JPEG, PNG ou WebP.");
            e.target.value = "";
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            alert("L’image ne doit pas dépasser 5 Mo.");
            e.target.value = "";
            return;
        }
        setUploadingImage(true);
        try {
            const { data } = await uploadApi.image(file);
            setForm((current) => ({ ...current, imageUrl: data.imageUrl }));
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || "Échec de l’envoi de l’image.");
        } finally {
            setUploadingImage(false);
            e.target.value = "";
        }
    };

    const handleSubmit = async () => {
        if (!form.title || !form.startDate) return;
        setLoading(true);
        try {
            if (event) {
                await eventApi.update(event._id, form);
            } else {
                await eventApi.create(form);
            }
            onDone?.();
            onClose();
        } catch (error) {
            console.error(error);
            alert("Erreur lors de l'enregistrement.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="relative w-full max-w-lg rounded-3xl bg-white p-6 shadow-xl">
                <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
                    <X className="size-5" />
                </button>

                <span className="font-semibold font-fraunces text-[#D6336C] text-2xl">
                    {event ? "Modifier l'événement" : "Nouvel événement"}
                </span>

                <div className="mt-6 space-y-3">
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="Titre"
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none"
                    />
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Description"
                        rows={3}
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none"
                    />
                    <input
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Lieu"
                        className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none"
                    />
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Photo de l’événement (JPEG, PNG ou WebP — 5 Mo max.)</label>
                        <input
                            type="file"
                            accept="image/jpeg,image/png,image/webp"
                            onChange={handleImageUpload}
                            disabled={uploadingImage || loading}
                            className="w-full rounded-xl border border-gray-200 p-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-pink-50 file:px-3 file:py-1.5 file:font-semibold file:text-[#D6336C]"
                        />
                        {uploadingImage && <p className="text-xs text-gray-500">Envoi vers Appwrite…</p>}
                        {form.imageUrl && <img src={form.imageUrl} alt="Aperçu de l’événement" className="h-36 w-full rounded-xl object-cover" />}
                        <label className="block text-xs text-gray-500">Ou coller une URL d’image existante</label>
                        <input
                            type="url"
                            name="imageUrl"
                            value={form.imageUrl}
                            onChange={handleChange}
                            placeholder="https://…"
                            className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none"
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <input
                            type="datetime-local"
                            name="startDate"
                            value={form.startDate}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none"
                        />
                        <input
                            type="datetime-local"
                            name="endDate"
                            value={form.endDate}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none"
                        />
                    </div>
                    {event && (
                        <select
                            name="status"
                            value={form.status}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:border-[#D6336C] focus:outline-none"
                        >
                            <option value="upcoming">À venir</option>
                            <option value="ongoing">En cours</option>
                            <option value="completed">Terminé</option>
                            <option value="cancelled">Annulé</option>
                        </select>
                    )}
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={loading || uploadingImage}
                    className="mt-6 w-full rounded-full bg-[#D6336C] py-2.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? "Enregistrement..." : "Enregistrer"}
                </button>
            </div>
        </div>
    );
}