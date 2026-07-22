import React from 'react'
import EventCard from './EventCard.jsx'

function Event() {
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-4 mb-4">
        <div className="mb-4 ">
          <span className="font-semibold font-fraunces text-[#D6336C] text-4xl">
            Evènements à venir
          </span>
        </div>
        <EventCard />
    </div>
  )
}

export default Event