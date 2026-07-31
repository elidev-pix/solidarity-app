import React, { useState } from 'react'
import { Check, X, Archive } from 'lucide-react'
import { useInitiatives, updateInitiative } from '../../data/mockInitiatives.js'
import { Skeleton } from '../../Components/ui/skeleton.jsx'
import ScrollReveal from '../../Components/ScrollReveal.jsx'

function StatusBadge({ status }) {
  const styles = {
    'En attente': 'bg-orange-50 text-orange-500',
    'Acceptée': 'bg-green-50 text-green-600',
    'Refusée': 'bg-red-50 text-red-500',
    'Archivée': 'bg-gray-100 text-gray-500',
  }
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}>{status}</span>
}

function AdminInitiatives() {
  const { data: initiatives, loading } = useInitiatives()
  const [processingId, setProcessingId] = useState(null)

  async function handleUpdate(id, status) {
    setProcessingId(id)
    await updateInitiative(id, { status })
    setProcessingId(null)
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {initiatives.length === 0 ? (
        <p className="text-sm text-gray-400">Aucune initiative proposée pour le moment.</p>
      ) : (
        initiatives.map((init, index) => (
          <ScrollReveal key={init.id} delay={index * 80}>
            <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-gray-900">{init.title}</h4>
                  <StatusBadge status={init.status} />
                </div>
                <p className="text-xs text-gray-400">Proposé par {init.author}</p>
                <p className="text-sm text-gray-600">{init.description}</p>
                <p className="text-xs text-gray-400">Objectif : {init.objective}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => handleUpdate(init.id, 'Acceptée')}
                  disabled={processingId === init.id}
                  className="flex items-center gap-1 text-xs font-semibold bg-green-50 hover:bg-green-100 text-green-600 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Check size={14} /> Approuver
                </button>
                <button
                  onClick={() => handleUpdate(init.id, 'Refusée')}
                  disabled={processingId === init.id}
                  className="flex items-center gap-1 text-xs font-semibold bg-red-50 hover:bg-red-100 text-red-500 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <X size={14} /> Refuser
                </button>
                <button
                  onClick={() => handleUpdate(init.id, 'Archivée')}
                  disabled={processingId === init.id}
                  className="flex items-center gap-1 text-xs font-semibold bg-gray-50 hover:bg-gray-100 text-gray-500 px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <Archive size={14} /> Archiver
                </button>
              </div>
            </div>
          </ScrollReveal>
        ))
      )}
    </div>
  )
}

export default AdminInitiatives