import React from 'react'
import { Mail, MapPin, PhoneCall } from 'lucide-react'
import ScrollReveal from './ScrollReveal.jsx'

const quickLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Nos actions', href: '/contact' },
  { label: 'Actualités', href: '/actualités' },
  { label: 'Evènements', href: '/Evènements' },
]

const legalLinks = [
  { label: 'Mentions légales', href: '#' },
  { label: 'Politique de confidentialité', href: '#' },
  { label: "Conditions d'utilisation", href: '#' },
]

/* Icônes réseaux sociaux en SVG natif (absentes de lucide-react) */
const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 8h-2a2 2 0 0 0-2 2v3H9v3h2v6h3v-6h2.2l.8-3H14v-2a1 1 0 0 1 1-1h2V8Z" />
  </svg>
)

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
  </svg>
)

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M4 4l16 16M20 4L4 20" />
  </svg>
)

const socials = [
  { icon: FacebookIcon, href: '#', label: 'Facebook' },
  { icon: InstagramIcon, href: '#', label: 'Instagram' },
  { icon: XIcon, href: '#', label: 'X (Twitter)' },
]

function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-8 py-16">
        <ScrollReveal>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">

          {/* Logo & baseline */}
          <div className="md:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="/logo_solidarity-removebg-preview.png"
                alt="Logo"
                className="h-16 w-24 object-contain"
              />
              <div className="flex gap-2 text-xl font-montserrat tracking-tighter">
                <span>SOLIDARITY</span>
                <span className="text-[#D6336C]">GROUP</span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-6 text-gray-500">
              Organisation apolitique et à but non lucratif, engagée depuis 2022
              pour la solidarité, le vivre-ensemble et le développement durable
              au Burkina Faso.
            </p>
            <div className="flex gap-3 mt-2">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="glow-pink flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 border border-gray-100 text-gray-500 hover:text-[#D6336C] hover:border-[#D6336C]/30 transition-colors"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          {/* Liens rapides */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#252525]">Navigation</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="nav-link hover:text-[#D6336C] transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + légal */}
          <div className="flex flex-col gap-4">
            <h4 className="font-bold text-[#252525]">Contact</h4>
            <ul className="flex flex-col gap-3 text-sm text-gray-500">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-[#B36CB2]" />
                solidaritygroupbf@yahoo.com
              </li>
              <li className="flex items-center gap-2">
                <PhoneCall size={16} className="text-[#B36CB2]" />
                +226 58 47 49 75
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-[#B36CB2]" />
                Ouagadougou, Burkina Faso
              </li>
            </ul>
          </div>
        </div>

        {/* Bas de footer */}
        <div className="mt-12 flex flex-col-reverse items-center justify-between gap-4 border-t border-gray-100 pt-6 md:flex-row">
          <span className="text-xs text-gray-400">
            © {new Date().getFullYear()} Solidarity Group. Tous droits réservés.
          </span>
          <ul className="flex flex-wrap justify-center gap-6 text-xs text-gray-400">
            {legalLinks.map(({ label, href }) => (
              <li key={label}>
                <a href={href} className="hover:text-[#D6336C] transition-colors">{label}</a>
              </li>
            ))}
          </ul>
        </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}

export default Footer