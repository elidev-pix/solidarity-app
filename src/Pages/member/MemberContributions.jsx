import React from 'react'
import { Wallet, TrendingUp } from 'lucide-react'
import { useContributions, MONTHLY_FEE_AMOUNT } from '../../data/mockContributions.js'
import { Skeleton } from '../../Components/ui/skeleton.jsx'

function StatusBadge({ status }) {
  const isPaid = status === 'Payé'
  return (
    <span
      className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
        isPaid ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'
      }`}
    >
      {status}
    </span>
  )
}

function MemberContributions() {
  const { data: contributions, loading } = useContributions()

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-24 w-full rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    )
  }

  const paidMonths = contributions.filter((c) => c.status === 'Payé')
  const totalPaid = paidMonths.length * MONTHLY_FEE_AMOUNT
  const totalDue = contributions.length * MONTHLY_FEE_AMOUNT
  const remaining = totalDue - totalPaid
  const progress = Math.round((paidMonths.length / contributions.length) * 100)

  return (
    <div className="flex flex-col gap-6">
      {/* Résumé */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-green-50 flex items-center justify-center">
            <Wallet size={20} className="text-green-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400">Total payé</p>
            <h3 className="text-xl font-bold text-gray-900">{totalPaid.toLocaleString()} FCFA</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center gap-4">
          <div className="h-11 w-11 rounded-xl bg-orange-50 flex items-center justify-center">
            <Wallet size={20} className="text-orange-500" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-400">Restant dû</p>
            <h3 className="text-xl font-bold text-gray-900">{remaining.toLocaleString()} FCFA</h3>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400 flex items-center gap-1.5">
              <TrendingUp size={14} /> Progression annuelle
            </span>
            <span className="text-xs font-bold text-[#D6336C]">{progress}%</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#D6336C] to-[#B36CB2] rounded-full transition-all duration-700"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 overflow-x-auto">
        <h3 className="font-bold text-gray-900 mb-4">Historique des cotisations</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase">
              <th className="pb-3">Mois</th>
              <th className="pb-3">Montant</th>
              <th className="pb-3">Statut</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((c) => (
              <tr key={c.id} className="border-b border-gray-50 text-sm">
                <td className="py-3 font-semibold text-gray-800">{c.month}</td>
                <td className="py-3 text-gray-500">{c.amount.toLocaleString()} FCFA</td>
                <td className="py-3"><StatusBadge status={c.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MemberContributions