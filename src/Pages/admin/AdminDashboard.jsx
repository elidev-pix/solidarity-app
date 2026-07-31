import React from 'react'
import { Users, Wallet, CalendarPlus, ClipboardList } from 'lucide-react'
import { useMembers } from '../../data/mockMembers.js'
import { useEvents } from '../../data/mockEvents.js'
import { useContributions } from '../../data/mockContributions.js'
import { useRequests } from '../../data/mockRequests.js'
import StatCard from '../../Components/dashboard/StatCard.jsx'
import { Skeleton } from '../../Components/ui/skeleton.jsx'

function AdminDashboard() {
  const { data: members, loading: membersLoading } = useMembers()
  const { data: events, loading: eventsLoading } = useEvents()
  const { data: contributions, loading: contribLoading } = useContributions()
  const { data: requests, loading: requestsLoading } = useRequests()

  const isLoading = membersLoading || eventsLoading || contribLoading || requestsLoading
  const totalCollected = contributions?.filter((c) => c.status === 'Payé').reduce((sum, c) => sum + c.amount, 0) ?? 0
  const pendingRequests = requests?.filter((r) => r.status === 'En attente').length ?? 0

  return (
    <div className="flex flex-col gap-6">
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
            <StatCard icon={Users} label="Membres totaux" value={members.length} badge="Actifs" />
            <StatCard icon={Wallet} label="Cotisations collectées" value={`${totalCollected.toLocaleString()} FCFA`} />
            <StatCard icon={CalendarPlus} label="Événements planifiés" value={events.length} />
            <StatCard icon={ClipboardList} label="Nouvelles demandes" value={pendingRequests} badge={pendingRequests > 0 ? 'À traiter' : undefined} />
          </>
        )}
      </div>

      {/* Graphique fictif de croissance */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-6">Croissance des membres</h3>
        <div className="w-full h-48 flex items-end gap-3 px-2">
          {[40, 55, 45, 70, 60, 85, 75, 95, 80, 100, 90, 110].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-[#D6336C] to-[#B36CB2] transition-all duration-700"
                style={{ height: `${h}px` }}
              />
              <span className="text-[10px] text-gray-400">
                {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard