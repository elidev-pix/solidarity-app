import { useEffect, useState } from 'react'
import { CalendarDays, MapPin } from 'lucide-react'
import ScrollReveal from './ScrollReveal.jsx'
import { eventApi } from '../services/api.js'

function EventCard() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    eventApi.getAll()
      .then(({ data }) => {
        if (active) setEvents((Array.isArray(data) ? data : []).filter((event) => event.status !== 'cancelled' && event.status !== 'completed').slice(0, 4))
      })
      .catch((error) => console.error('Chargement des événements impossible :', error))
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  if (loading) return <p className="py-10 text-sm text-gray-500">Chargement des événements…</p>
  if (!events.length) return <p className="py-10 text-sm text-gray-500">Aucun événement à venir pour le moment.</p>

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch justify-center px-2 sm:px-4 gap-6">
      {events.map((event, index) => (
        <ScrollReveal key={event._id} delay={index * 80} duration={600} distance={20} threshold={0.2}>
          <article className="glow-purple flex flex-col rounded-2xl bg-white border border-gray-200 shadow-lg overflow-hidden h-full min-h-80 w-full max-w-xs mx-auto p-4 gap-4">
            {event.imageUrl ? <img src={event.imageUrl} alt={event.title} className="rounded-md w-full h-40 object-cover" /> : <div className="rounded-md w-full h-40 bg-pink-50 flex items-center justify-center text-sm text-gray-400">Événement</div>}
            <div className="flex flex-col gap-1">
              <h2 className="font-bold">{event.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">{event.description}</p>
            </div>
            <div className="flex gap-2 items-start">
              <CalendarDays size={20} className="shrink-0 text-[#B36CB2]" />
              <span className="text-[#B36CB2] font-bold text-sm">{event.startDate ? new Date(event.startDate).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' }) : 'Date à préciser'}</span>
            </div>
            <div className="flex gap-2 text-[#B36CB2] font-bold text-sm items-center">
              <MapPin size={20} /><span>{event.location || 'Lieu à préciser'}</span>
            </div>
          </article>
        </ScrollReveal>
      ))}
    </div>
  )
}

export default EventCard
