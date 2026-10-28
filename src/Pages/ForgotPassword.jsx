import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import { authApi } from '../services/api.js';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');
    setSubmitting(true);
    try {
      const response = await authApi.requestPasswordReset(email.trim());
      setMessage(response.data.message);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Impossible d'envoyer la demande pour le moment.");
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
          <div className="text-[#D6336C]"><Mail size={28} /></div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Mot de passe oublié ?</h1>
            <p className="mt-2 text-sm text-gray-500">Saisissez l’adresse e-mail associée à votre compte. Si un compte actif correspond, vous recevrez un lien temporaire.</p>
          </div>
          <label className="flex flex-col gap-2 text-sm font-semibold text-gray-600">
            Adresse e-mail
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="email"
              required
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 focus:outline-none focus:border-[#D6336C]"
              placeholder="vous@exemple.com"
            />
          </label>
          {message && <p role="status" className="text-sm text-green-700 bg-green-50 rounded-xl p-3">{message}</p>}
          {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
          <button type="submit" disabled={submitting} className="w-full bg-[#D6336C] hover:bg-[#B36CB2] text-white font-semibold py-3.5 rounded-xl transition-colors disabled:opacity-60">
            {submitting ? 'Envoi en cours…' : 'Envoyer le lien'}
          </button>
        </form>
      </div>
    </main>
  );
}
