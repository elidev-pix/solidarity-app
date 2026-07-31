import React, { useState } from 'react'
import { Check, X, Mail, Phone } from 'lucide-react'
import { useRequests, updateRequest } from '../../data/mockRequests.js'
import { addMember } from '../../data/mockMembers.js'
import { Skeleton } from '../../Components/ui/skeleton.jsx'
import ScrollReveal from '../../Components/ScrollReveal.jsx'

function AdminRequests() {
  const { data: requests, loading } = useRequests()
  const [processingId, setProcessingId] = useState(null)

  async function handleAccept(request) {
    setProcessingId(request.id)
    const newId = `SG-2026-${String(Date.now()).slice(-3)}`
    await addMember({
      id: newId,
      firstName: request.firstName,
      lastName: request.lastName,
      photo: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200',
      phone: request.phone,
      whatsapp: request.whatsapp,
      email: request.email,
      city: request.city,
      joinedAt: new Date().toISOString().slice(0, 10),
      status: 'Actif',
    })
    await updateRequest(request.id, { status: 'Acceptée' })
    setProcessingId(null)
    // Ici, à la bascule Supabase : déclencher l'envoi d'un identifiant par email/WhatsApp
  }

  async function handleReject(id) {
    setProcessingId(id)
    await updateRequest(id, { status: 'Refusée' })
    setProcessingId(null)
  }

  const pending = requests?.filter((r) => r.status === 'En attente') ?? []
  const processed = requests?.filter((r) => r.status !== 'En attente') ?? []

  if (loading) {
    return (
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-2xl" />)}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-gray-900">Candidatures en attente ({pending.length})</h3>
        {pending.length === 0 ? (
          <p className="text-sm text-gray-400">Aucune candidature en attente.</p>
        ) : (
          pending.map((req, index) => (
            <ScrollReveal key={req.id} delay={index * 80}>
              <div className="glow-pink bg-white rounded-2xl border border-gray-100 p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-col gap-1">
                  <h4 className="font-bold text-gray-900">{req.firstName} {req.lastName}</h4>
                  <p className="text-sm text-gray-500">{req.profession} · {req.city}</p>
                  <div className="flex flex-wrap gap-4 mt-1 text-xs text-gray-400">
                    <span className="flex items-center gap-1"><Mail size={12} /> {req.email}</span>
                    <span className="flex items-center gap-1"><Phone size={12} /> {req.phone}</span>
                  </div>
                  <p className="text-sm text-gray-600 italic mt-2 max-w-lg">"{req.motivation}"</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleAccept(req)}
                    disabled={processingId === req.id}
                    className="flex items-center gap-1.5 bg-[#D6336C] hover:bg-[#B36CB2] text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-60"
                  >
                    <Check size={16} /> Accepter
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    disabled={processingId === req.id}
                    className="flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors disabled:opacity-60"
                  >
                    <X size={16} /> Refuser
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))
        )}
      </div>

      {processed.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="font-bold text-gray-900">Historique</h3>
          {processed.map((req) => (
            <div key={req.id} className="flex items-center justify-between bg-gray-50 rounded-xl p-4 text-sm">
              <span className="text-gray-700">{req.firstName} {req.lastName}</span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${req.status === 'Acceptée' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                {req.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AdminRequests