import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Nos actions', href: '/contact' },
  { label: 'Actualités', href: '/actualités' },
  { label: 'Evènements', href: '/Evènements' },
  { label: 'Contact', href: '/contact' },
]

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <div className="font-extra-montserrat font-bold relative">
      <nav className="flex h-20 px-4 sm:px-8 items-center justify-between bg-white text-sm">
        <div className="flex items-center mt-2">
          <img src="/logo_solidarity-removebg-preview.png" alt="Logo" className="h-16 w-24 sm:h-24 sm:w-36" />
          <div className="flex gap-2 text-lg sm:text-2xl font-montserrat tracking-tighter">
            <span>SOLIDARITY</span>
            <span className="text-[#D6336C]">GROUP</span>
          </div>
        </div>

        {/* Liens — visibles seulement à partir de lg */}
        <ul className="hidden lg:flex gap-8">
          {navItems.map(({ label, href }) => (
            <li key={label}><a href={href} className="nav-link">{label}</a></li>
          ))}
        </ul>

        <Link
          to="/app"
          className="hidden lg:flex bg-[#B36CB2] items-center gap-2 text-white px-4 py-2 rounded-2xl shadow glow-purple"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span>Nous rejoindre</span>
        </Link>

        {/* Bouton burger — visible en dessous de lg */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-[#252525]"
          aria-label="Ouvrir le menu"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Panneau mobile */}
      {open && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-t border-gray-100 shadow-md z-50 animate-fade-in-up">
          <ul className="flex flex-col items-center gap-6 py-8">
            {navItems.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="nav-link text-base" onClick={() => setOpen(false)}>{label}</a>
              </li>
            ))}
            <Link
              to="/app"
              onClick={() => setOpen(false)}
              className="flex bg-[#B36CB2] items-center gap-2 text-white px-5 py-2.5 rounded-2xl shadow"
            >
            <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>Nous rejoindre</span>
            </Link>
          </ul>
        </div>
      )}
    </div>
  )
}

export default Header