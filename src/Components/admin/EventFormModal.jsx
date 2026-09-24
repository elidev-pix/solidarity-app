// Path: src/Components/admin/EventFormModal.jsx
import { useEffect, useState } from "react";
import { eventApi } from "@/services/api";
import { X } from "lucide-react";

const empty = { title: "", description: "", location: "", startDate: "", endDate: "", status: "upcoming" };

export default function EventFormModal({ open, onClose, onDone, event }) {
    const [form, setForm] = useState(empty);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (event) {
            setForm({
                title: event.title || "",
                description: event.description || "",
                location: event.location || "",
                startDate: event.startDate ? event.startDate.slice(0, 16) : "",
                endDate: event.endDate ? event.endDate.slice(0, 16) : "",
                status: event.status || "upcoming",
            });
        } else {
            setForm(empty);
        }
    }, [event, open]);

    if (!open) return null;

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

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
                    disabled={loading}
                    className="mt-6 w-full rounded-full bg-[#D6336C] py-2.5 font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
                >
                    {loading ? "Enregistrement..." : "Enregistrer"}
                </button>
            </div>
        </div>
    );
}