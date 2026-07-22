import React from 'react'

const commentsData = [
  {
    name: 'Ngolo Kanté',
    role: 'Bénéficiaire',
    stars: '★★★★★',
    text: "L'impact sur notre quartier a été immédiat. L'aide alimentaire nous a permis de traverser une période difficile.",
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
  },
  {
    name: 'Evan Nguessan',
    role: 'Bénévole Actif',
    stars: '★★★★★',
    text: "Être bénévole ici donne un vrai sens à mon temps libre. Une vraie chaleur humaine au cœur des actions.",
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
  },
  {
    name: 'Saluel Eto\'o',
    role: 'Partenaire',
    stars: '★★★★☆',
    text: "Un soutien précieux pour notre communauté. Les équipes font un travail remarquable au quotidien.",
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100'
  },
  {
    name: 'Traoré Mathieu',
    role: 'Donateur',
    stars: '★★★★★',
    text: "Transparence exemplaire et engagement sincère. Fière de contribuer chaque mois à leurs projets.",
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100'
  }
]

// Duplication automatique pour l'effet d'animation infinie
const allComments = [...commentsData, ...commentsData]

function Comments() {
  return (
    <>
      {/* CSS personnalisé injecté pour l'animation */}
      <style>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 25s linear infinite;
        }
      `}</style>

      <div className='flex flex-col items-center justify-center'>
        <div className="mb-4">
          <span className="font-semibold font-fraunces text-[#D6336C] text-4xl">
            Ils partagent notre vision
          </span>
        </div>

        <section className="w-full max-w-6xl overflow-hidden py-10 relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#f8f7ff] to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#f8f7ff] to-transparent z-10"></div>

          <div className="flex gap-6 w-max animate-infinite-scroll hover:[animation-play-state:paused]">
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