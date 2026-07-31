import React from 'react'
import { Menu } from 'lucide-react'

function Topbar({ title, subtitle, onMenuClick }) {
  return (
    <header className="flex items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-gray-500">
          <Menu size={24} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </header>
  )
}

export default Topbar