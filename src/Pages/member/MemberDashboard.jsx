import React from 'react'
import { CalendarCheck, Wallet, Lightbulb, PartyPopper } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'
import { useEvents } from '../../data/mockEvents.js'
import { useContributions } from '../../data/mockContributions.js'
import { useInitiatives } from '../../data/mockInitiatives.js'
import StatCard from '../../Components/dashboard/StatCard.jsx'
import { Skeleton } from '../../Components/ui/skeleton.jsx'

function MemberDashboard() {
  const { session } = useAuth()
  const { data: events, loading: eventsLoading } = useEvents()
  const { data: contributions, loading: contribLoading } = useContributions()
  const { data: initiatives, loading: initLoading } = useInitiatives()

  const isLoading = eventsLoading || contribLoading || initLoading
  const paidCount = contributions?.filter((c) => c.status === 'Payé').length ?? 0

  return (
    <div className="flex flex-col gap-6">
      <div className="glow-pink bg-gradient-to-r from-[#D6336C] to-[#B36CB2] rounded-3xl p-8 text-white">
        <h2 className="text-2xl font-bold">Bonjour, {session?.user?.firstName} 👋</h2>
        <p className="text-white/90 mt-1 max-w-lg">
          Bienvenue sur votre espace membre. Voici un aperçu de votre engagement au sein de l'association.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col gap-4">
              <Skeleton className="h-11 w-11 rounded-xl" />
              <Skeleton className="h-3 w-1/2" />
              <Skeleton className="h-8 w-1/3" />
            </div>
          ))
        ) : (
          <>
            <StatCard icon={CalendarCheck} label="Activités à venir" value={events.length} />
            <StatCard icon={PartyPopper} label="Participations" value="3" badge="+1 ce mois" />
            <StatCard icon={Wallet} label="Cotisations versées" value={`${paidCount * 1000} FCFA`} />
            <StatCard icon={Lightbulb} label="Initiatives proposées" value={initiatives.length} />
          </>
        )}
      </div>
    </div>
  )
}

export default MemberDashboard