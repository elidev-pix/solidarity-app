import React, { useState } from 'react'
import { CalendarDays, MapPin, Check, X } from 'lucide-react'
import { useEvents } from '../../data/mockEvents.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { Skeleton } from '../../Components/ui/skeleton.jsx'
import ScrollReveal from '../../Components/ScrollReveal.jsx'

function MemberActivities() {
  const { session } = useAuth()
  const { data: events, loading } = useEvents()
  // Simulation locale : { eventId: 'confirmé' | 'indisponible' }
  const [myStatus, setMyStatus] = useState({})

  function setStatus(eventId, status) {
    setMyStatus((prev) => ({ ...prev, [eventId]: status }))
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-gray-100 p-4 flex flex-col gap-3">
            <Skeleton className="h-40 w-full rounded-xl" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-9 w-full mt-2" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => {
        const status = myStatus[event.id]
        return (
          <ScrollReveal key={event.id} delay={index * 80} distance={20}>
            <div className="glow-pink bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col">
              <img src={event.image} alt={event.title} className="h-40 w-full object-cover" />
              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="font-bold text-gray-900">{event.title}</h3>
                <p className="text-sm text-gray-500 flex-1">{event.description}</p>

                <div className="flex items-center gap-2 text-sm text-[#B36CB2] font-semibold">
                  <CalendarDays size={16} />
                  {new Date(event.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' })} à {event.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-[#B36CB2] font-semibold">
                  <MapPin size={16} />
                  {event.place}
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setStatus(event.id, 'confirmé')}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-xl transition-colors ${
                      status === 'confirmé'
                        ? 'bg-[#D6336C] text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Check size={16} /> Je participe
                  </button>
                  <button
                    onClick={() => setStatus(event.id, 'indisponible')}
                    className={`flex-1 flex items-center justify-center gap-1.5 text-sm font-semibold py-2.5 rounded-xl transition-colors ${
                      status === 'indisponible'
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <X size={16} /> Indisponible
                  </button>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )
      })}
    </div>
  )
}

export default MemberActivities