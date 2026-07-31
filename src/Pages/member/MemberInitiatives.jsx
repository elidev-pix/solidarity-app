import React, { useState } from 'react'
import { Lightbulb, Send } from 'lucide-react'
import { useInitiatives, addInitiative } from '../../data/mockInitiatives.js'
import { useAuth } from '../../context/AuthContext.jsx'
import { Skeleton } from '../../Components/ui/skeleton.jsx'
import ScrollReveal from '../../Components/ScrollReveal.jsx'

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#D6336C] focus:ring-1 focus:ring-[#D6336C] transition-colors'

function StatusBadge({ status }) {
  const styles = {
    'En attente': 'bg-orange-50 text-orange-500',
    'Acceptée': 'bg-green-50 text-green-600',
    'Refusée': 'bg-red-50 text-red-500',
  }
  return <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${styles[status]}`}>{status}</span>
}

function MemberInitiatives() {
  const { session } = useAuth()
  const { data: initiatives, loading } = useInitiatives()
  const [form, setForm] = useState({ title: '', description: '', objective: '' })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    await addInitiative({
      id: `INIT-${Date.now()}`,
      author: `${session?.user?.firstName} ${session?.user?.lastName}`,
      ...form,
      status: 'En attente',
    })
    setForm({ title: '', description: '', objective: '' })
    setSubmitting(false)
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Formulaire de proposition */}
      <div className="glow-pink bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Lightbulb size={18} className="text-[#D6336C]" /> Proposer une initiative
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            required
            placeholder="Titre de l'initiative"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className={inputClass}
          />
          <textarea
            required
            rows="3"
            placeholder="Décrivez votre idée..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={`${inputClass} resize-none`}
          />
          <input
            required
            placeholder="Objectif visé (ex : sensibiliser 100 personnes)"
            value={form.objective}
            onChange={(e) => setForm({ ...form, objective: e.target.value })}
            className={inputClass}
          />
          <button
            type="submit"
            disabled={submitting}
            className="self-start flex items-center gap-2 bg-[#D6336C] hover:bg-[#B36CB2] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors disabled:opacity-60"
          >
            {submitting ? 'Envoi...' : (<>Soumettre <Send size={16} /></>)}
          </button>
        </form>
      </div>

      {/* Liste des initiatives déjà proposées */}
      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-gray-900">Mes initiatives proposées</h3>
        {loading ? (
          Array.from({ length: 2 }).map((_, i) => <Skeleton key={i} className="h-24 w-full rounded-2xl" />)
        ) : initiatives.length === 0 ? (
          <p className="text-sm text-gray-400">Vous n'avez encore proposé aucune initiative.</p>
        ) : (
          initiatives.map((init, index) => (
            <ScrollReveal key={init.id} delay={index * 80}>
              <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900">{init.title}</h4>
                  <StatusBadge status={init.status} />
                </div>
                <p className="text-sm text-gray-500">{init.description}</p>
                <p className="text-xs text-gray-400">Objectif : {init.objective}</p>
              </div>
            </ScrollReveal>
          ))
        )}
      </div>
    </div>
  )
}

export default MemberInitiatives