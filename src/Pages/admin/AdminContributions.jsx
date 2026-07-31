import React from 'react'
import { Wallet, TrendingUp } from 'lucide-react'
import { useContributions, updateContribution, MONTHLY_FEE_AMOUNT } from '../../data/mockContributions.js'
import { useMembers } from '../../data/mockMembers.js'
import { Skeleton } from '../../Components/ui/skeleton.jsx'

function AdminContributions() {
  const { data: contributions, loading: contribLoading } = useContributions()
  const { data: members, loading: membersLoading } = useMembers()
  const loading = contribLoading || membersLoading

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Skeleton className="h-24 w-full rounded-2xl" />
          <Skeleton className="h-24 w-full rounded-2xl" />
        </div>
        <Skeleton className="h-80 w-full rounded-2xl" />
      </div>
    )
  }

  const totalCollected = contributions.filter((c) => c.status === 'Payé').reduce((sum, c) => sum + c.amount, 0)
  const totalExpected = contributions.length * MONTHLY_FEE_AMOUNT * members.length
  const progress = Math.round((totalCollected / (contributions.length * MONTHLY_FEE_AMOUNT * members.length || 1)) * 100)

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-[#D6336C]/10 flex items-center justify-center">
            <Wallet size={20} className="text-[#D6336C]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400">Total collecté</p>
            <h3 className="text-2xl font-bold text-gray-900">{totalCollected.toLocaleString()} FCFA</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-2 justify-center">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 flex items-center gap-1.5"><TrendingUp size={14} /> Progression annuelle globale</span>
            <span className="text-xs font-bold text-[#D6336C]">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#D6336C] to-[#B36CB2] rounded-full transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 overflow-x-auto">
        <h3 className="font-bold text-gray-900 mb-4">Paiements des membres</h3>
        <table className="w-full text-left border-collapse min-w-[520px]">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase">
              <th className="pb-3">Membre</th>
              <th className="pb-3">Mois en cours</th>
              <th className="pb-3">Statut</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => {
              // Simulation simple : on associe le dernier statut de la liste globale au membre
              const status = contributions[contributions.length - 1]?.status ?? 'En attente'
              return (
                <tr key={member.id} className="border-b border-gray-50 text-sm">
                  <td className="py-3 font-semibold text-gray-800">{member.firstName} {member.lastName}</td>
                  <td className="py-3 text-gray-500">{contributions[contributions.length - 1]?.month}</td>
                  <td className="py-3">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${status === 'Payé' ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'}`}>
                      {status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button
                      onClick={() => updateContribution(contributions[contributions.length - 1]?.id, { status: 'Payé' })}
                      className="text-xs font-semibold text-[#D6336C] hover:underline"
                    >
                      Marquer payé
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminContributions