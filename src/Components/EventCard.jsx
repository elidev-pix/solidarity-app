import React from 'react'
import { CalendarDays, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import ScrollReveal from './ScrollReveal.jsx'

const events = [
  {
    img: '/don1.jpg',
    title: 'Rencontre partenaires',
    description: "Rencontre annuel avec les partenaires pour l'organisation d'activités de salubrité",
    date: '16 Août, 2026 à 15:00 GMT',
    place: 'Koulouba',
  },
  {
    img: '/don2.jpg',
    title: 'Visite Orphelinat',
    description: "Rencontre annuel avec les partenaires pour l'organisation d'activités de salubrité",
    date: '16 Août, 2026 à 15:00 GMT',
    place: 'Koulouba',
  },
  {
    img: '/don3.jpg',
    title: 'Journée salubrité',
    description: "Rencontre annuel avec les partenaires pour l'organisation d'activités de salubrité",
    date: '16 Août, 2026 à 15:00 GMT',
    place: 'Koulouba',
  },
  {
    img: '/don4.jpg',
    title: 'Visite Orphelinat',
    description: "Rencontre annuel avec les partenaires pour l'organisation d'activités de salubrité",
    date: '16 Août, 2026 à 15:00 GMT',
    place: 'Koulouba',
  },
]

function EventCard() {
  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch justify-center px-2 sm:px-4 gap-6">
      {events.map(({ img, title, description, date, place }, index) => (
        <ScrollReveal
          key={title + index}
          delay={index * 80}
          duration={600}
          distance={20}
          threshold={0.2}
        >
          <div className="glow-purple flex flex-col rounded-2xl bg-white border-1 border-[#B36CB2] shadow-lg overflow-hidden h-auto min-h-96 w-full max-w-xs mx-auto p-4 gap-4">
            <div className="flex">
              <img src={img} alt={title} className="rounded-md w-full h-40 object-cover" />
            </div>
            <div className="flex flex-col">
              <h2 className="font-bold">{title}</h2>
              <span className="text-sm">{description}</span>
            </div>
            <div className="flex gap-2">
              <CalendarDays size={20} className="text-[#B36CB2]" />
              <span className="text-[#B36CB2] font-bold text-sm">{date}</span>
            </div>
            <div className="flex gap-2 text-[#B36CB2] font-bold text-sm items-center">
              <MapPin size={20} /><span>{place}</span>
            </div>
          </div>
        </ScrollReveal>
      ))}
    </div>
  )
}

export default EventCard