import React from 'react'
import { Clock, Mail, PhoneCall, MapPin, Send } from 'lucide-react'
import ScrollReveal from './ScrollReveal.jsx'

const infoCards = [
  { icon: Clock, bg: 'bg-red-200/50', color: 'text-red-500', title: 'Horaires', value: 'Ouvert 24h/24' },
  { icon: Mail, bg: 'bg-purple-200/50', color: 'text-purple-500', title: 'Notre Email', value: 'solidaritygroupbf@yahoo.com' },
  { icon: PhoneCall, bg: 'bg-blue-200/50', color: 'text-blue-500', title: 'Téléphone', value: '+226 58 47 49 75' },
  { icon: MapPin, bg: 'bg-green-200/50', color: 'text-green-500', title: 'Nous rendre visite', value: 'Ouagadougou' },
]

function Contact() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-10">
      <ScrollReveal>
        <div className="mb-2 text-center">
          <span className="font-semibold font-fraunces text-[#D6336C] text-4xl">
            Nous Contacter
          </span>
          <p className="mt-3 max-w-xl mx-auto text-sm text-gray-500">
            Chaque message est une opportunité de créer un impact. Que vous
            souhaitiez devenir bénévole, faire un don ou proposer un
            partenariat, nous serons ravis d'échanger avec vous.
          </p>
        </div>
      </ScrollReveal>

      <div className="grid w-full max-w-6xl grid-cols-1 gap-8 px-4 lg:grid-cols-5">

        {/* Colonne infos — 2/5, cascade carte par carte */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          {infoCards.map(({ icon: Icon, bg, color, title, value }, index) => (
            <ScrollReveal key={title} delay={index * 100} duration={600} distance={20} threshold={0.2}>
              <div className="glow-purple flex items-center gap-4 rounded-2xl border border-gray-100 bg-white p-5">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${bg}`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-gray-800">{title}</span>
                  <span className="text-sm text-gray-500">{value}</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Formulaire — 3/5, apparaît juste après la dernière carte info */}
        <ScrollReveal delay={infoCards.length * 100} duration={650} distance={24} threshold={0.15} className="lg:col-span-3">
          <form className="glow-pink w-full bg-white p-8 rounded-[24px] flex flex-col gap-5 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-800">Envoyez-nous un message</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="fullName" className="text-[15px] font-semibold text-gray-600">Nom complet</label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Votre nom"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#D6336C] focus:ring-1 focus:ring-[#D6336C] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[15px] font-semibold text-gray-600">Adresse email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="vous@exemple.com"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#D6336C] focus:ring-1 focus:ring-[#D6336C] transition-colors"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="inquiry" className="text-[15px] font-semibold text-gray-600">Votre message</label>
              <textarea
                id="inquiry"
                rows="4"
                placeholder="Comment pouvons-nous vous aider ?"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-[14px] text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#D6336C] focus:ring-1 focus:ring-[#D6336C] resize-none transition-colors"
              ></textarea>
            </div>

            <button
              type="submit"
              className="glow-pink flex items-center justify-center gap-2 w-full bg-[#D6336C] hover:bg-[#B36CB2] text-white font-semibold text-[16px] py-3.5 rounded-xl mt-2 transition-colors"
            >
              Envoyer <Send size={18} />
            </button>
          </form>
        </ScrollReveal>
      </div>
    </div>
  )
}

export default Contact