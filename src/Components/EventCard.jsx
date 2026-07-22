import React from 'react'
import {CalendarDays, MapPin} from 'lucide-react'
import {Link} from 'react-router-dom'
function EventCard() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center px-2 gap-6">
        <div className="flex flex-col rounded-2xl bg-white border-2 border-[#B36CB2] shadow-lg overflow-hidden h-96 w-64 p-4 gap-4">
            <div className='flex '>
                <img src="/don1.jpg" alt="" className='rounded-md' />
            </div>
            <div className="flex flex-col">
                <h2 className='font-bold'>Rencontre partenaires</h2>
                <span className='text-sm'>
                    Rencontre annuel avec les partenaires pour l'organisation d'activités de salubrité
                </span>
            </div>
            <div className="flex gap-2">
                <CalendarDays size={20} className="text-[#B36CB2]" />
                <span className='text-[#B36CB2] font-bold text-sm'>16 Août,2026 à 15:00 GMT</span>
            </div>
             <div className="flex gap-2 text-[#B36CB2] font-bold text-sm items-center">
                <MapPin size={20}/><span>Koulouba</span>
            </div>
        </div>
        <div className="flex flex-col rounded-2xl bg-white border-2 border-[#B36CB2] shadow-lg overflow-hidden h-96 w-64 p-4 gap-4">
            <div className='flex '>
                <img src="/don2.jpg" alt="" className='rounded-md' />
            </div>
            <div className="flex flex-col">
                <h2 className='font-bold'>Visite Orphelinat</h2>
                <span className='text-sm'>
                    Rencontre annuel avec les partenaires pour l'organisation d'activités de salubrité
                </span>
            </div>
            <div className="flex gap-2">
                <CalendarDays size={20} className="text-[#B36CB2]" />
                <span className='text-[#B36CB2] font-bold text-sm'>16 Août,2026 à 15:00 GMT</span>
            </div>
             <div className="flex gap-2 text-[#B36CB2] font-bold text-sm items-center">
                <MapPin size={20}/><span>Koulouba</span>
            </div>
        </div>
        <div className="flex flex-col rounded-2xl bg-white border-2 border-[#B36CB2] shadow-lg overflow-hidden h-96 w-64 p-4 gap-4">
            <div className='flex '>
                <img src="/don3.jpg" alt="" className='rounded-md' />
            </div>
            <div className="flex flex-col">
                <h2 className='font-bold'>Journée salubrité</h2>
                <span className='text-sm'>
                    Rencontre annuel avec les partenaires pour l'organisation d'activités de salubrité
                </span>
            </div>
            <div className="flex gap-2">
                <CalendarDays size={20} className="text-[#B36CB2]" />
                <span className='text-[#B36CB2] font-bold text-sm'>16 Août,2026 à 15:00 GMT</span>
            </div>
             <div className="flex gap-2 text-[#B36CB2] font-bold text-sm items-center">
                <MapPin size={20}/><span>Koulouba</span>
            </div>
        </div>
        <div className="flex flex-col rounded-2xl bg-white border-2 border-[#B36CB2] shadow-lg overflow-hidden h-96 w-64 p-4 gap-4">
            <div className='flex '>
                <img src="/don4.jpg" alt="" className='rounded-md' />
            </div>
            <div className="flex flex-col">
                <h2 className='font-bold'>Visite Orphelinat</h2>
                <span className='text-sm'>
                    Rencontre annuel avec les partenaires pour l'organisation d'activités de salubrité
                </span>
            </div>
            <div className="flex gap-2">
                <CalendarDays size={20} className="text-[#B36CB2]" />
                <span className='text-[#B36CB2] font-bold text-sm'>16 Août,2026 à 15:00 GMT</span>
            </div>
             <div className="flex gap-2 text-[#B36CB2] font-bold text-sm items-center">
                <MapPin size={20}/><span>Koulouba</span>
            </div>
        </div>
    </div>
  )
}

export default EventCard