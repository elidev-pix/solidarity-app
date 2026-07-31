import React, { useState } from 'react'
import { Eye, Pencil, Trash2, Search } from 'lucide-react'
import { useMembers, removeMember } from '../../data/mockMembers.js'
import { Skeleton } from '../../Components/ui/skeleton.jsx'

function StatusBadge({ status }) {
  const isActive = status === 'Actif'
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${isActive ? 'bg-green-50 text-green-600' : 'bg-orange-50 text-orange-500'}`}>
      {status}
    </span>
  )
}

function AdminMembers() {
  const { data: members, loading } = useMembers()
  const [search, setSearch] = useState('')
  const [deletingId, setDeletingId] = useState(null)

  async function handleDelete(id) {
    setDeletingId(id)
    await removeMember(id)
    setDeletingId(null)
  }

  const filtered = members?.filter((m) =>
    `${m.firstName} ${m.lastName}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <h3 className="font-bold text-gray-900">Liste des membres</h3>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher un membre..."
            className="pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-xl focus:outline-none focus:border-[#D6336C] focus:ring-1 focus:ring-[#D6336C] transition-colors"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[640px]">
          <thead>
            <tr className="border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase">
              <th className="pb-3">Membre</th>
              <th className="pb-3">Téléphone</th>
              <th className="pb-3">N° membre</th>
              <th className="pb-3">Statut</th>
              <th className="pb-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i} className="border-b border-gray-50">
                  <td className="py-4"><div className="flex items-center gap-3"><Skeleton className="h-9 w-9 rounded-full" /><Skeleton className="h-4 w-24" /></div></td>
                  <td className="py-4"><Skeleton className="h-4 w-28" /></td>
                  <td className="py-4"><Skeleton className="h-4 w-20" /></td>
                  <td className="py-4"><Skeleton className="h-5 w-16 rounded-full" /></td>
                  <td className="py-4"><Skeleton className="h-4 w-16 ml-auto" /></td>
                </tr>
              ))
            ) : (
              filtered.map((member) => (
                <tr key={member.id} className="border-b border-gray-50 text-sm hover:bg-gray-50/50 transition-colors">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <img src={member.photo} alt={member.firstName} className="h-9 w-9 rounded-full object-cover" />
                      <span className="font-semibold text-gray-800">{member.firstName} {member.lastName}</span>
                    </div>
                  </td>
                  <td className="py-4 text-gray-500">{member.phone}</td>
                  <td className="py-4 text-gray-500">{member.id}</td>
                  <td className="py-4"><StatusBadge status={member.status} /></td>
                  <td className="py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-gray-400 hover:text-[#B36CB2] transition-colors"><Eye size={16} /></button>
                      <button className="text-gray-400 hover:text-[#D6336C] transition-colors"><Pencil size={16} /></button>
                      <button
                        onClick={() => handleDelete(member.id)}
                        disabled={deletingId === member.id}
                        className="text-gray-400 hover:text-red-500 transition-colors disabled:opacity-40"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {!loading && filtered.length === 0 && (
          <p className="text-center text-sm text-gray-400 py-8">Aucun membre trouvé.</p>
        )}
      </div>
    </div>
  )
}

export default AdminMembers