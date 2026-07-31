import React, { useState } from 'react'
import { Plus, Pencil, Trash2, CalendarDays, MapPin, X } from 'lucide-react'
import { useEvents, addEvent, removeEvent } from '../../data/mockEvents.js'
import { Skeleton } from '../../Components/ui/skeleton.jsx'

const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#D6336C] focus:ring-1 focus:ring-[#D6336C] transition-colors'

function AdminEvents() {
  const { data: events, loading } = useEvents()
  const [showForm, setShowForm] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', place: '', image: '/don1.jpg' })

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    await addEvent({ id: `EVT-${Date.now()}`, ...form })
    setForm({ title: '', description: '', date: '', time: '', place: '', image: '/don1.jpg' })
    setSubmitting(false)
    setShowForm(false)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-end">
        <button
          onClick={() => setShowForm(!showForm)}
          className="glow-pink flex items-center gap-2 bg-[#D6336C] hover:bg-[#B36CB2] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors"
        >
          {showForm ? <X size={16} /> : <Plus size={16} />}
          {showForm ? 'Annuler' : 'Créer un événement'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input required placeholder="Titre" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={`${inputClass} sm:col-span-2`} />
          <textarea required placeholder="Description" rows="2" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={`${inputClass} sm:col-span-2 resize-none`} />
          <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className={inputClass} />
          <input required type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} className={inputClass} />
          <input required placeholder="Lieu" value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} className={`${inputClass} sm:col-span-2`} />
          <button type="submit" disabled={submitting} className="sm:col-span-2 bg-[#D6336C] hover:bg-[#B36CB2] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60">
            {submitting ? 'Création...' : "Créer l'événement"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-64 w-full rounded-2xl" />)
        ) : (
          events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
              <img src={event.image} alt={event.title} className="h-32 w-full object-cover" />
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h4 className="font-bold text-gray-900">{event.title}</h4>
                <div className="flex items-center gap-1.5 text-xs text-[#B36CB2] font-semibold">
                  <CalendarDays size={14} /> {new Date(event.date).toLocaleDateString('fr-FR')} · {event.time}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-[#B36CB2] font-semibold">
                  <MapPin size={14} /> {event.place}
                </div>
                <div className="flex gap-2 mt-auto pt-2">
                  <button className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 rounded-lg transition-colors">
                    <Pencil size={13} /> Modifier
                  </button>
                  <button
                    onClick={() => removeEvent(event.id)}
                    className="flex-1 flex items-center justify-center gap-1 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-500 py-2 rounded-lg transition-colors"
                  >
                    <Trash2 size={13} /> Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminEvents