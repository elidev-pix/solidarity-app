import React from 'react'
import { Phone, MessageCircle, Mail, MapPin, Calendar, Hash, Pencil, LogOut } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

// QR code décoratif — pas de vraie donnée encodée, purement visuel
function FakeQRCode() {
  const cells = Array.from({ length: 49 }, (_, i) => (i * 7) % 3 === 0)
  return (
    <div className="grid grid-cols-7 gap-[2px] h-16 w-16 bg-white p-1.5 rounded-md shrink-0">
      {cells.map((filled, i) => (
        <div key={i} className={filled ? 'bg-gray-900 rounded-[1px]' : 'bg-transparent'} />
      ))}
    </div>
  )
}

function MemberAccount() {
  const { session, logout } = useAuth()
  const member = session?.user

  if (!member) return null

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      {/* Carte de membre numérique */}
      <div className="relative bg-gradient-to-br from-[#D6336C] to-[#B36CB2] rounded-3xl p-6 text-white overflow-hidden">
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
        <div className="flex items-center justify-between relative z-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Carte de membre</p>
            <h2 className="text-2xl font-bold mt-1">{member.firstName} {member.lastName}</h2>
            <p className="text-sm opacity-90 mt-1">N° {member.id}</p>
            <span className="inline-block mt-3 text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
              Membre actif
            </span>
          </div>
          <FakeQRCode />
        </div>
      </div>

      {/* Infos personnelles */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={member.photo}
            alt={member.firstName}
            className="h-16 w-16 rounded-full object-cover border-2 border-[#D6336C]/20"
          />
          <div>
            <h3 className="font-bold text-gray-900">{member.firstName} {member.lastName}</h3>
            <p className="text-sm text-gray-400">Membre depuis {new Date(member.joinedAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 text-sm">
            <Phone size={16} className="text-[#B36CB2]" />
            <span className="text-gray-600">{member.phone}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MessageCircle size={16} className="text-[#B36CB2]" />
            <span className="text-gray-600">{member.whatsapp}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Mail size={16} className="text-[#B36CB2]" />
            <span className="text-gray-600">{member.email}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <MapPin size={16} className="text-[#B36CB2]" />
            <span className="text-gray-600">{member.city}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar size={16} className="text-[#B36CB2]" />
            <span className="text-gray-600">Adhésion : {new Date(member.joinedAt).toLocaleDateString('fr-FR')}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Hash size={16} className="text-[#B36CB2]" />
            <span className="text-gray-600">{member.id}</span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button className="glow-pink flex items-center gap-2 bg-[#D6336C] hover:bg-[#B36CB2] text-white font-semibold text-sm px-5 py-3 rounded-xl transition-colors">
          <Pencil size={16} /> Modifier mon profil
        </button>
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-gray-50 hover:bg-gray-100 text-gray-600 font-semibold text-sm px-5 py-3 rounded-xl transition-colors"
        >
          <LogOut size={16} /> Déconnexion
        </button>
      </div>
    </div>
  )
}

export default MemberAccount