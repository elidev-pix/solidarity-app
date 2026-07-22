import React from 'react'
import { Link } from 'react-router-dom'
import {ArrowUpRight} from 'lucide-react'

function LowerHeader() {
  return (
    <div className="flex h-64 mb-16 items-center justify-center">
        <div className='flex flex-col items-center justify-center mt-4 h-36 px-2 gap-4 text-[#D6336C] font-extrabold'>
            <span className='text-center font-fraunces text-5xl'>Ensemble Construisons <br /> Un Monde Meilleur</span>
            <span className='text-center text-sm text-black font-light italic'>Seuls nous pouvons faire si peu , ensemble nous pouvons faire beaucoup !</span>
            <Link to="/app" className='flex items-center justify-center bg-[#B36CB2] text-white px-4 py-2 gap-1 rounded-2xl shadow-lg'>
                <span>Faire un don</span><ArrowUpRight size={20} />
            </Link>
        </div>   
    </div>
    
  )
}

export default LowerHeader