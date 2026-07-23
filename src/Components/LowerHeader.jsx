import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

function LowerHeader() {
  return (
    <div className="flex h-auto py-16 sm:h-64 sm:py-0 mb-8 sm:mb-16 items-center justify-center px-4">
      <div className="flex flex-col items-center justify-center gap-4 text-[#D6336C] font-extrabold">
        <span className="text-center font-fraunces text-3xl sm:text-4xl lg:text-5xl leading-tight">
          Ensemble Construisons <br /> Un Monde Meilleur
        </span>
        <span className="text-center text-sm text-black font-light italic max-w-md">
          Seuls nous pouvons faire si peu, ensemble nous pouvons faire beaucoup !
        </span>
        <Link to="/app" className="glow-purple flex items-center justify-center bg-[#B36CB2] text-white px-4 py-2 gap-1 rounded-2xl shadow-lg">
          <span>Faire un don</span><ArrowUpRight size={20} />
        </Link>
      </div>
    </div>
  )
}

export default LowerHeader