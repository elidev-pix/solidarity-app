import React, { useState } from 'react'
import { LockKeyhole, LogOut, Save } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { changePasswordRequest } from '../services/api.js'
import { useAuth } from '../context/AuthContext.jsx'

function ChangePassword() {
  const { session, markPasswordChanged, logout } = useAuth()
  const navigate = useNavigate()
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')

    if (newPassword !== confirmation) {
      setError('Les nouveaux mots de passe ne correspondent pas.')
      return
    }

    setSubmitting(true)
    try {
      await changePasswordRequest(oldPassword, newPassword)
      markPasswordChanged()
      navigate(session.role === 'admin' ? '/admin' : '/member', { replace: true })
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Impossible de modifier le mot de passe.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col gap-5">
        <div>
          <div className="flex items-center gap-2 text-[#D6336C] mb-3">
            <LockKeyhole size={22} />
            <span className="font-semibold">Première connexion</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Changez votre mot de passe</h1>
          <p className="text-sm text-gray-500 mt-2">Utilisez un nouveau mot de passe d’au moins 6 caractères.</p>
        </div>

        <label className="flex flex-col gap-2 text-sm font-semibold text-gray-600">
          Mot de passe actuel
          <input
            type="password"
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#D6336C]"
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-gray-600">
          Nouveau mot de passe
          <input
            type="password"
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#D6336C]"
            minLength={6}
            required
          />
        </label>

        <label className="flex flex-col gap-2 text-sm font-semibold text-gray-600">
          Confirmer le nouveau mot de passe
          <input
            type="password"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#D6336C]"
            minLength={6}
            required
          />
        </label>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 w-full bg-[#D6336C] hover:bg-[#B36CB2] text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-60"
        >
          {submitting ? 'Enregistrement...' : <>Enregistrer <Save size={18} /></>}
        </button>

        <button
          type="button"
          onClick={logout}
          className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#D6336C]"
        >
          <LogOut size={16} /> Se déconnecter
        </button>
      </form>
    </div>
  )
}

export default ChangePassword
