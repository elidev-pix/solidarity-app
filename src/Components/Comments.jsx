import React from 'react'

const commentsData = [
  // AUTORITÉS ET PERSONNALITÉS
  {
    name: 'Son Excellence Abdoulaye BASSINGA',
    role: 'Gouverneur de la Région du Centre – Parrain 2025',
    stars: '★★★★★',
    text: "La solidarité portée par une jeunesse engagée constitue une véritable force pour notre société. Encourager ces initiatives, c’est contribuer à construire un Burkina Faso plus uni et plus résilient.",
    avatar: '/com1.jpg'
  },
  {
    name: 'Assetou OUEDRAOGO',
    role: 'Marraine de la Semaine Caritative',
    stars: '★★★★★',
    text: "La solidarité est une valeur essentielle. Chaque geste posé en faveur des autres apporte de l’espoir et contribue à améliorer des vies.",
    avatar: '/com2.jpg'
  },
  {
    name: 'Moussa DICKO',
    role: 'Représentant du Ministre de la Communication',
    stars: '★★★★★',
    text: "Monsieur le Ministre est très content, très heureux de voir qu'il y a une jeunesse au Burkina Faso qui est très consciente. Une jeunesse qui parle solidarité, qui parle d’action caritative. Le message, c’est vraiment de les féliciter et de les encourager dans cette dynamique pour le bonheur du Burkina Faso.",
    avatar: '/com3.jpg'
  },
  {
    name: 'Atéridar Galip SOME',
    role: 'Directeur Général de la RTB',
    stars: '★★★★★',
    text: "Nous saluons l’engagement de Solidarity Group qui met en avant une jeunesse responsable, engagée et consciente de son rôle dans la construction du Burkina Faso. Les initiatives citoyennes comme celles-ci méritent d’être accompagnées et valorisées.",
    avatar: '/com4.jpg'
  },
  {
    name: 'Pascaline NIKIEMA',
    role: 'Directrice Régionale des Eaux et Forêts',
    stars: '★★★★★',
    text: "La protection de l’environnement est une responsabilité collective. Nous encourageons cette initiative qui démontre que la jeunesse burkinabè peut être un acteur majeur dans la préservation de notre patrimoine naturel.",
    avatar: '/com5.jpg'
  },

  // LES BÉNÉFICIAIRES DE NOS ACTIONS
  {
    name: 'Fanta Konaté/Ouédraogo',
    role: 'Promotrice de l’Orphelinat Cri du Cœur',
    stars: '★★★★★',
    text: "Donc je ne peux que les dire merci et puis vraiment les bénir. Santé, longévité, parce que c’est ça qui est la base. S’il y a la santé et la longévité, on peut tout espérer. Vraiment. Prospérité dans leurs études.",
    avatar: '/com6.jpg'
  },
  {
    name: 'Pensionnaire',
    role: 'Orphelinat Cri du Cœur',
    stars: '★★★★★',
    text: "Je voulais leur dire grand merci. On a eu des habits, des moustiquaires, des médicaments, des jouets, du riz et des pâtes.",
    avatar: '/com7.jpg'
  },
  {
    name: 'Porte-parole',
    role: 'Personnes déplacées internes',
    stars: '★★★★★',
    text: "Nous sommes très fiers et nous les remercions beaucoup. Nous voulons appeler les gens qui veulent nous aider à nous aider, de suivre leur exemple. C’est un bon exemple.",
    avatar: '/com8.jpg'
  },
  {
    name: 'Porte-parole',
    role: 'Personnes déplacées internes',
    stars: '★★★★★',
    text: "Vraiment ici, notre vrai souci, c’est l’eau. L’eau nous manque. Et puis, il y a le manger aussi. Lui, il a fait ce qu’il peut, il continue à faire aussi. Nous le remercions beaucoup.",
    avatar: '/com9.jpg'
  },

  // INSTITUTIONS
  {
    name: 'CNTS',
    role: 'Centre National de Transfusion Sanguine',
    stars: '★★★★★',
    text: "Le don de sang est un geste citoyen qui sauve des vies. Nous saluons la mobilisation de Solidarity Group qui contribue à sensibiliser la population sur l’importance du don volontaire de sang.",
    avatar: '/com10.jpg'
  },
  {
    name: 'CHU Pédiatrique',
    role: 'Charles de Gaulle',
    stars: '★★★★★',
    text: "Votre action auprès des enfants hospitalisés représente un véritable message de solidarité, de compassion et d’espoir pour les familles.",
    avatar: '/com11.jpg'
  },

  // NOS PARTENAIRES
  {
    name: 'RTB',
    role: 'Radiodiffusion Télévision du Burkina',
    stars: '★★★★★',
    text: "Accompagner Solidarity Group, c’est soutenir une jeunesse engagée qui œuvre pour la solidarité, le vivre-ensemble et le bien-être des communautés. Ces initiatives citoyennes méritent d’être encouragées et valorisées.",
    avatar: '/com12.jpg'
  },
  {
    name: 'Nephtali Média',
    role: 'Partenaire',
    stars: '★★★★★',
    text: "Nous avons découvert une équipe jeune, dynamique et déterminée, avec une réelle volonté d’apporter un impact positif dans la société. Solidarity Group représente une jeunesse qui agit et qui inspire.",
    avatar: '/com13.jpg'
  },
  {
    name: 'Les Éditions Le Pays',
    role: 'Partenaire',
    stars: '★★★★★',
    text: "Les actions de Solidarity Group démontrent qu’une jeunesse consciente et organisée peut contribuer efficacement au développement social du Burkina Faso.",
    avatar: '/com14.jpg'
  },
  {
    name: 'ZoodoMail',
    role: 'Partenaire',
    stars: '★★★★★',
    text: "Nous sommes heureux d’accompagner une organisation qui place l’humain au cœur de son engagement et qui apporte des réponses concrètes aux besoins des communautés.",
    avatar: '/com15.jpg'
  },
  {
    name: "Nana’s Pastry",
    role: 'Partenaire',
    stars: '★★★★★',
    text: "Chaque contribution compte lorsqu’elle participe à apporter du sourire et de l’espoir aux personnes qui en ont besoin.",
    avatar: '/com16.jpg'
  },
  {
    name: 'Éclat Pub',
    role: 'Partenaire',
    stars: '★★★★★',
    text: "Valoriser une cause comme celle portée par Solidarity Group, c’est contribuer à donner plus de visibilité aux actions positives qui transforment la société.",
    avatar: '/com17.jpg'
  },
  {
    name: 'Wekre Digital',
    role: 'Partenaire',
    stars: '★★★★★',
    text: "Solidarity Group représente une jeunesse ambitieuse et engagée qui utilise ses compétences pour servir une cause noble.",
    avatar: '/com18.jpg'
  },

  // LA JEUNESSE QUI NOUS SOUTIENT
  {
    name: 'Farida TIENDREBEOGO',
    role: 'Jeunesse',
    stars: '★★★★★',
    text: "Félicitations à Solidarity Group pour toutes ces belles initiatives. Voir des jeunes se mobiliser pour aider les autres est une source de fierté. Continuez à garder cette énergie et cette volonté de faire le bien autour de vous.",
    avatar: '/com19.jpg'
  },
  {
    name: 'Corinne KIEMTRORE',
    role: 'Jeunesse',
    stars: '★★★★★',
    text: "Ce que vous faites est vraiment inspirant. La solidarité ne se limite pas aux paroles, elle se voit dans les actions. Bravo à toute l’équipe de Solidarity Group pour cet engagement envers la communauté.",
    avatar: '/com20.jpg'
  },
  {
    name: 'Souleymane KABORE',
    role: 'Jeunesse',
    stars: '★★★★★',
    text: "Félicitations à toute l’équipe de Solidarity Group. Vous démontrez qu’avec de la détermination, de l’organisation et un esprit d’équipe, la jeunesse peut avoir un véritable impact dans la société. Continuez ainsi.",
    avatar: '/com21.jpg'
  },
  {
    name: 'Carel BAMOGO',
    role: 'Jeunesse',
    stars: '★★★★★',
    text: "Une jeunesse qui décide d’agir pour les autres mérite d’être encouragée. Force et courage à Solidarity Group pour toutes ces actions qui apportent du sourire et de l’espoir.",
    avatar: '/com22.jpg'
  },
  {
    name: 'Daryl NIKIEMA',
    role: 'Jeunesse',
    stars: '★★★★★',
    text: "Félicitations à Solidarity Group pour cette belle vision. Ce n’est pas seulement une association, c’est une famille de jeunes qui veulent apporter leur contribution au changement. Continuez à inspirer.",
    avatar: '/com23.jpg'
  },
  {
    name: 'Marie Noëlle TRAORE 🇨🇮',
    role: 'Jeunesse',
    stars: '★★★★★',
    text: "La solidarité dépasse les frontières. Voir des jeunes du Burkina Faso s’engager avec autant de cœur montre que les valeurs humaines peuvent unir toute une génération africaine. Bravo à Solidarity Group pour cette belle dynamique.",
    avatar: '/com24.jpg'
  },
  {
    name: 'Alban TIENOU 🇲🇱',
    role: 'Jeunesse',
    stars: '★★★★★',
    text: "Votre engagement est un exemple pour la jeunesse africaine. Continuez à porter ces valeurs de partage, d’entraide et de fraternité. Les grandes transformations commencent toujours par des personnes qui décident d’agir.",
    avatar: '/com25.jpg'
  },
  {
    name: 'Pito KAMATÉ 🇲🇱',
    role: 'Jeunesse',
    stars: '★★★★★',
    text: "Félicitations à Solidarity Group pour son engagement. Votre parcours montre qu’une jeunesse consciente peut créer un impact positif autour d’elle. Continuez à avancer et à inspirer d’autres jeunes.",
    avatar: '/com26.jpg'
  },

  // MEMBRES ET BÉNÉVOLES
  {
    name: 'Membres & Bénévoles',
    role: 'Solidarity Group',
    stars: '★★★★★',
    text: "Nous avons compris qu’il n’est pas nécessaire d’avoir beaucoup pour aider. Il suffit d’avoir la volonté, le temps et l’engagement pour faire une différence dans la vie des autres.",
    avatar: '/com27.jpg'
  }
]

// Duplication automatique pour l'effet d'animation infinie
const allComments = [...commentsData, ...commentsData]

function Comments() {
  return (
    <>
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .scroll-track {
          animation: infinite-scroll 180s linear infinite;
        }
        .scroll-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className='flex flex-col items-center justify-center'>
        <div className="flex items-center justify-center mb-4">
          <span className="font-semibold font-fraunces text-[#D6336C] text-4xl">
            Ils partagent notre vision
          </span>
        </div>

        <section className="w-full max-w-6xl overflow-hidden py-10 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f8f7ff] to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#f8f7ff] to-transparent z-10"></div>

          <div className="flex gap-6 w-max scroll-track">
            {allComments.map((comment, index) => (
              <div 
                key={index} 
                className="w-[400px] bg-white rounded-2xl p-6 relative border border-purple-50 shadow-sm flex flex-col justify-between shrink-0"
              >
                <span className="absolute top-2 right-6 text-7xl font-serif text-purple-100 select-none">”</span>
                <div>
                  <div className="text-amber-400 text-sm mb-2">{comment.stars}</div>
                  <p className="text-slate-600 text-sm italic relative z-10 mb-6">"{comment.text}"</p>
                </div>
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full object-cover" src={comment.avatar} alt={comment.name} />
                  <div>
                    <div className="font-semibold text-sm text-slate-800">{comment.name}</div>
                    <div className="text-xs text-slate-400">{comment.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default Comments