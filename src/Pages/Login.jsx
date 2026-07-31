import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom' // <-- Ajout de Link
import { LogIn, User, Lock, Info, ArrowLeft } from 'lucide-react' // <-- Ajout de ArrowLeft
import { useAuth } from '../context/AuthContext.jsx'

const inputClass =
  'w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#D6336C] focus:ring-1 focus:ring-[#D6336C] transition-colors'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    const result = await login(username, password)
    setSubmitting(false)
    if (result.success) {
      navigate(result.role === 'admin' ? '/admin' : '/member')
    } else {
      setError(result.error)
    }
  }

  function fillDemo(role) {
    if (role === 'admin') {
      setUsername('admin')
      setPassword('admin123')
    } else {
      setUsername('SG-2026-001')
      setPassword('member123')
    }
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        
        {/* --- BOUTON RETOUR AJOUTÉ ICI --- */}
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#D6336C] transition-colors"
          >
            <ArrowLeft size={16} />
            Retour à l'accueil
          </Link>
        </div>
        {/* -------------------------------- */}

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xl font-montserrat tracking-tighter">SOLIDARITY</span>
            <span className="text-xl font-montserrat tracking-tighter text-[#D6336C]">GROUP</span>
          </div>
          <p className="text-sm text-gray-500">Connectez-vous à votre espace</p>
        </div>

        <form onSubmit={handleSubmit} className="glow-pink bg-white rounded-3xl border border-gray-100 p-8 flex flex-col gap-5 shadow-sm">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Identifiant</label>
            <div className="relative">
              <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={inputClass}
                placeholder="admin ou SG-2026-001"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-600">Mot de passe</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputClass}
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="glow-pink flex items-center justify-center gap-2 w-full bg-[#D6336C] hover:bg-[#B36CB2] text-white font-semibold py-3.5 rounded-xl mt-1 transition-colors disabled:opacity-60"
            >
            {submitting ? 'Connexion...' : (<>Se connecter <LogIn size={18} /></>)}
          </button>
        </form>

        {/* Comptes de démonstration */}
        <div className="mt-6 bg-white rounded-2xl border border-dashed border-gray-200 p-5">
          <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-3">
            <Info size={14} /> Comptes de démonstration
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => fillDemo('admin')}
              className="text-left text-xs bg-gray-50 hover:bg-gray-100 rounded-xl p-3 transition-colors"
            >
              <span className="block font-bold text-gray-700">Administrateur</span>
              <span className="block text-gray-400 mt-1">admin / admin123</span>
            </button>
            <button
              onClick={() => fillDemo('member')}
              className="text-left text-xs bg-gray-50 hover:bg-gray-100 rounded-xl p-3 transition-colors"
            >
              <span className="block font-bold text-gray-700">Membre</span>
              <span className="block text-gray-400 mt-1">SG-2026-001 / member123</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login