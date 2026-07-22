import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='font-extra-montserrat font-bold'>
        <nav className='flex h-20 px-8 items-center justify-between bg-white text-sm'>
            <div className="flex items-center mt-2">
                <img src="/logo_solidarity-removebg-preview.png" alt="Logo" className='h-24 w-36' />
                <div className='flex gap-2 text-2xl font-montserrat tracking-tighter'>
                    <span>SOLIDARITY</span>
                    <span className='text-[#D6336C]'>GROUP</span>
                </div>
            </div>
            <ul className='flex gap-8'>
                <li><a href="/">Accueil</a></li>
                <li><a href="/about">À propos</a></li>
                <li><a href="/contact">Nos actions</a></li>
                <li><a href="/actualités">Actualités</a></li>
                <li><a href="/Evènements">Evènements</a></li>
                <li><a href="/contact">Contact</a></li>
            </ul>
            <Link to="/app" className='flex bg-[#B36CB2] items-center gap-2 text-white px-4 py-2 rounded-2xl shadow'>
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                <span>Nous rejoindre</span>
            </Link>
        </nav>
    </div>
  )
}

export default Header