import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, LockKeyhole } from 'lucide-react';
import { authApi } from '../services/api.js';

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');
    if (!token) {
      setError('Le lien est incomplet. Demandez un nouveau lien de réinitialisation.');
      return;
    }
    if (password !== confirmation) {
      setError('Les deux mots de passe ne correspondent pas.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await authApi.resetPassword(token, password);
      setMessage(response.data.message);
      window.history.replaceState({}, '', '/reset-password');
      setTimeout(() => navigate('/login', { replace: true }), 1800);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'Impossible de réinitialiser le mot de passe.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/login" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#D6336C]">
          <ArrowLeft size={16} /> Retour à la connexion
        </Link>
        <form onSubmit={handleSubmit} className="mt-6 bg-white rounded-3xl border border-gray-100 p-8 shadow-sm flex flex-col gap-5">
          <div className="text-[#D6336C]"><LockKeyhole size={28} /></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Créer un nouveau mot de passe</h1>
            <p className="mt-2 text-sm text-gray-500">Choisissez un mot de passe d’au moins 8 caractères. Le lien ne peut être utilisé qu’une seule fois.</p>
          </div>
          <label className="flex flex-col gap-2 text-sm font-semibold text-gray-600">
            Nouveau mot de passe
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="new-password" minLength={8} required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D6336C]" />
          </label>
          <label className="flex flex-col gap-2 text-sm font-semibold text-gray-600">
            Confirmer le mot de passe
            <input type="password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} autoComplete="new-password" minLength={8} required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#D6336C]" />
          </label>
          {message && <p role="status" className="text-sm text-green-700 bg-green-50 rounded-xl p-3">{message}</p>}
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={submitting} className="w-full bg-[#D6336C] hover:bg-[#B36CB2] text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-60">
            {submitting ? 'Enregistrement…' : 'Réinitialiser le mot de passe'}
          </button>
        </form>
      </div>
    </main>
  );
}
