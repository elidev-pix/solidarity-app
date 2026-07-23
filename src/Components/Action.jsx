import React from 'react'
import { Users, Utensils, HandHeart, Baby, ShieldPlus, Leaf } from 'lucide-react'
import ScrollReveal from './ScrollReveal'

const actions = [
  {
    icon: Utensils,
    iconBg: 'bg-red-200/50',
    iconColor: 'text-red-500',
    title: 'Aide alimentaire',
    description:
      "Distribution de repas nutritifs et de denrées essentielles pour lutter contre la précarité alimentaire au quotidien",
  },
  {
    icon: Users,
    iconBg: 'bg-orange-200/50',
    iconColor: 'text-orange-500',
    title: 'Mobilisation des Jeunes',
    description:
      "Engager la nouvelle génération dans des projets civiques et solidaires",
  },
  {
    icon: HandHeart,
    iconBg: 'bg-pink-200/50',
    iconColor: 'text-pink-500',
    title: 'Action communautaire',
    description:
      "Développement d'initiatives locales pour renforcer le lien social",
  },
  {
    icon: Baby,
    iconBg: 'bg-purple-200/50',
    iconColor: 'text-purple-500',
    title: 'Soutien aux orphelins',
    description:
      "Apporter un soutien moral, éducatif et matériel aux orphelins afin de contribuer à leur épanouissement et à leur bien-être",
  },
  {
    icon: ShieldPlus,
    iconBg: 'bg-blue-200/50',
    iconColor: 'text-blue-500',
    title: 'Visite des malades',
    description:
      "Apporter réconfort, assistance et soutien moral aux personnes malades à travers des visites scolaires et des actions humanitaires",
  },
  {
    icon: Leaf,
    iconBg: 'bg-green-200/50',
    iconColor: 'text-green-500',
    title: 'Salubrité',
    description:
      "Promouvoir la salubrité et la protection de l'environnement à travers des actions de sensibilisation et des activités de nettoyage communautaire",
  },
]

function Action() {
  return (
    <div>
        <div className="mb-16 text-center">
          <span className="font-semibold font-fraunces text-[#D6336C] text-4xl">
            Nos actions
          </span>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            "Des actions ciblées pour impact durable 
            <br />
            auprès des communautés vulnérables"
          </h2>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {actions.map(({ icon: Icon, iconBg, iconColor, title, description }, index) => (
           <ScrollReveal key={title} delay={index * 80} distance={20}>
            <div
            className="flex flex-col h-full rounded-[28px] border border-gray-200 bg-white p-8 shadow-sm transition-shadow hover:shadow-md"
            >
            <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBg}`}>
                <Icon className={`h-7 w-7 ${iconColor}`} />
            </div>

            <h3 className="mt-8 text-[22px] font-bold text-[#252525]">
                {title}
            </h3>

            <p className="mt-4 text-lg leading-8 text-[#666666]">
                {description}
            </p>
            </div>
            </ScrollReveal>
        ))}
        </div>
    </div>
  )
}

export default Action