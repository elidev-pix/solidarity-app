import React from 'react'

const PartnersLogo = [
    {image: "/partner1.jpeg"},
    {image: "/partner2.jpeg"},
    {image: "/partner3.jpeg"},
    {image: "/partner4.jpeg"},
    {image: "/partner5.jpeg"},
    {image: "/partner6.jpeg"},
    {image: "/partner7.jpeg"},
    {image: "/partner8.jpeg"},
    {image: "/partner9.jpeg"},
    {image: "/partner10.jpeg"}
]

const allPartners = [...PartnersLogo, ...PartnersLogo]

function Partners() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full overflow-hidden">
        <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 25s linear infinite;
        }
      `}</style>
        <div className="mb-4 ">
          <span className="font-semibold font-fraunces text-[#D6336C] text-4xl">
            Ils nous ont fait confiance
          </span>
        </div>
        {/* w-max empêche les éléments de se séparer/revenir à la ligne */}
        <div className="flex items-center justify-center gap-8 w-max animate-infinite-scroll hover:[animation-play-state:paused]">
            {allPartners.map((partner, index) => (
              /* shrink-0 empêche l'image de se faire déformer */
              <div
              key={index} 
                className="w-64 h-46 bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex items-center justify-center shrink-0"
              >
                {/* object-contain préserve le ratio du logo sans le déformer */}
                <img 
                  src={partner.image} 
                  alt="" 
                  className='max-w-full max-h-full object-contain' 
                />
              </div>
            ))}
        </div>
    </div>
  )
}

export default Partners