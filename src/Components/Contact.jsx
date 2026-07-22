import React from 'react'
import {Clock, Mail, PhoneCall, MapPin} from 'lucide-react'

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
        <div className="mb-4">
          <span className="font-semibold font-fraunces text-[#D6336C] text-4xl">
            Nous Contacter
          </span>
        </div>
        <div className='flex gap-8'>
            <div className="flex flex-col">
                <span className="text-sm text-black max-w-96">
                    Chaque message est une opportunité de créer un impact.
                    Que vous souhaitiez devenir bénévole, faire un don ou proposer un partenariat, nous serons ravis d'échanger avec vous.
                </span>
                <div className="grid md:grid-cols-1 lg:grid-cols-2 items-center justify-center gap-4">
                    <div className="flex flex-col rounded-lg border border-gray-100 p-4 gap-2">
                        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-red-200/50'>
                            <Clock className='h-7 w-7 text-red-500' />
                        </div>
                        <h1 className='font-bold'>Horaires</h1>   
                        <span className='font-bold text-sm text-gray-500'>Ouvert 24h/24</span>                   
                    </div>
                    <div className="flex flex-col rounded-lg border border-gray-100 p-4 gap-2">
                        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-200/50'>
                            <Mail className='h-7 w-7 text-purple-500' />
                        </div>  
                        <h1 className='font-bold'>Notre Email</h1>   
                        <span className='font-bold text-sm text-gray-500'>solidaritygroupbf@yahoo.com</span>                   
                    </div>
                    <div className="flex flex-col rounded-lg border border-gray-100 p-4 gap-2">
                        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-200/50'>
                            <PhoneCall className='h-7 w-7 text-blue-500' />
                        </div>  
                        <h1 className='font-bold'>Téléphone</h1>   
                        <span className='font-bold text-sm text-gray-500'>+226 58 47 49 75</span>                   
                    </div>
                    <div className="flex flex-col rounded-lg border border-gray-100 p-4 gap-2">
                        <div className='flex h-14 w-14 items-center justify-center rounded-2xl bg-green-200/50'>
                            <MapPin className='h-7 w-7 text-green-500' />
                        </div>  
                        <h1 className='font-bold'>Nous rendre visite</h1>   
                        <span className='font-bold text-sm text-gray-500'>Ouagadougou</span>                   
                    </div>
                </div>
            </div>
            <form class="w-full max-w-md bg-white p-6 rounded-[24px] flex flex-col gap-5 font-sans">
                <div class="flex flex-col gap-2">
                    <label for="fullName" class="text-[15px] font-semibold text-gray-600">Nom Complet</label>
                    <input 
                    type="text" 
                    id="fullName" 
                    placeholder="Full Name" 
                    class="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#5b6cf9] focus:ring-1 focus:ring-[#5b6cf9] transition-colors" 
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="email" class="text-[15px] font-semibold text-gray-600">Adresse Email</label>
                    <input 
                    type="email" 
                    id="email" 
                    placeholder="Enter your email address" 
                    class="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#5b6cf9] focus:ring-1 focus:ring-[#5b6cf9] transition-colors" 
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <label for="inquiry" class="text-[15px] font-semibold text-gray-600">Concernant votre demande</label>
                    <textarea 
                    id="inquiry" 
                    rows="4" 
                    placeholder="Enter your message" 
                    class="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#5b6cf9] focus:ring-1 focus:ring-[#5b6cf9] resize-none transition-colors"
                    ></textarea>
                </div>
                <button 
                    type="submit" 
                    class="w-full bg-[#5b6cf9] hover:bg-[#4f5ee3] text-white font-medium text-[16px] py-3.5 rounded-xl mt-3 transition-colors"
                >
                    Envoyer
                </button>
            </form>
        </div>
    </div>
    
  )
}

export default Contact