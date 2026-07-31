import React from 'react'
import { NavLink } from 'react-router-dom'
import { LogOut, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

function Sidebar({ links, isOpen, onClose }) {
  const { session, logout } = useAuth()

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-50 flex flex-col py-6 transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Header */}
        <div className="px-6 pb-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex gap-1 text-lg font-montserrat tracking-tighter">
            <span>SOLIDARITY</span>
            <span className="text-[#D6336C]">GROUP</span>
          </div>
          <button onClick={onClose} className="lg:hidden text-gray-400">
            <X size={22} />
          </button>
        </div>

        {/* Profil rapide */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#D6336C]/10 flex items-center justify-center text-[#D6336C] font-bold text-sm shrink-0">
            {session?.role === 'admin' ? 'AD' : session?.user?.firstName?.[0] || 'M'}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-gray-800 truncate">
              {session?.role === 'admin' ? 'Administrateur' : `${session?.user?.firstName} ${session?.user?.lastName}`}
            </span>
            <span className="text-xs text-gray-400">
              {session?.role === 'admin' ? 'Accès complet' : session?.user?.id}
            </span>
          </div>
        </div>

        {/* Liens */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-1">
          {links.map(({ label, to, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-[#D6336C]/10 text-[#D6336C]'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Déconnexion */}
        <div className="px-3 pt-4 border-t border-gray-100">
          <button
            onClick={logout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </aside>
    </>
  )
}

export default Sidebar