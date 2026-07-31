import React, { useState } from 'react'
import { Link } from 'react-router-dom' // <-- Ajout de l'import Link
import { CheckCircle2, Clock } from 'lucide-react'
import { useSettings } from '../data/mockSettings.js'
import { addRequest, addWaitlistEntry } from '../data/mockRequests.js'
import { Skeleton } from '../Components/ui/skeleton.jsx'
import ScrollReveal from '../Components/ScrollReveal.jsx'

const inputClass =
  'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-[#D6336C] focus:ring-1 focus:ring-[#D6336C] transition-colors'
const labelClass = 'text-sm font-semibold text-gray-600'

function JoinUs() {
  const { data: settings, loading: settingsLoading } = useSettings()
  const [submitted, setSubmitted] = useState(false)
  const [waitlisted, setWaitlisted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const [form, setForm] = useState({
    firstName: '', lastName: '', birthDate: '', gender: '', profession: '',
    phone: '', whatsapp: '', email: '', city: '', motivation: '',
  })
  const [waitForm, setWaitForm] = useState({ name: '', whatsapp: '' })

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    await addRequest({
      id: `REQ-${Date.now()}`,
      ...form,
      submittedAt: new Date().toISOString().slice(0, 10),
      status: 'En attente',
    })
    setSubmitting(false)
    setSubmitted(true)
  }

  async function handleWaitlistSubmit(e) {
    e.preventDefault()
    setSubmitting(true)
    await addWaitlistEntry({
      id: `WL-${Date.now()}`,
      ...waitForm,
      registeredAt: new Date().toISOString().slice(0, 10),
    })
    setSubmitting(false)
    setWaitlisted(true)
  }

  if (settingsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="max-w-2xl mx-auto flex flex-col gap-4">
          <Skeleton className="h-10 w-2/3 mx-auto" />
          <Skeleton className="h-4 w-full mx-auto" />
          <div className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col gap-5 mt-6">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-10">
            <span className="font-semibold font-fraunces text-[#D6336C] text-4xl">
              Rejoindre Solidarity Group
            </span>
            <p className="mt-3 text-sm text-gray-500">
              Devenez acteur du changement au sein de notre communauté engagée.
            </p>
            
            {/* --- LE LIEN DE CONNEXION EST AJOUTÉ ICI --- */}
            <p className="mt-4 text-sm text-gray-600">
              Déjà membre ?{' '}
              <Link to="/login" className="text-[#D6336C] font-semibold hover:text-[#B36CB2] hover:underline transition-colors">
                Connectez-vous à votre compte
              </Link>
            </p>
            {/* ------------------------------------------- */}

          </div>
        </ScrollReveal>

        {settings.registrationOpen ? (
          // ---- Adhésions ouvertes : formulaire complet ----
          submitted ? (
            <div className="glow-pink bg-white rounded-3xl border border-gray-100 p-10 text-center flex flex-col items-center gap-4">
              <CheckCircle2 size={48} className="text-[#D6336C]" />
              <h3 className="text-xl font-bold text-gray-800">Candidature envoyée !</h3>
              <p className="text-sm text-gray-500 max-w-sm">
                Merci {form.firstName}. Votre candidature est en cours d'examen par
                notre équipe. Vous recevrez un identifiant de membre par WhatsApp
                ou email une fois acceptée.
              </p>
            </div>
          ) : (
            <ScrollReveal delay={100}>
              <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 p-8 flex flex-col gap-5">
                {/* ... (Reste de ton formulaire inchangé) ... */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Prénom</label>
                    <input required name="firstName" value={form.firstName} onChange={handleChange} className={inputClass} placeholder="Votre prénom" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Nom</label>
                    <input required name="lastName" value={form.lastName} onChange={handleChange} className={inputClass} placeholder="Votre nom" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Date de naissance</label>
                    <input required type="date" name="birthDate" value={form.birthDate} onChange={handleChange} className={inputClass} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Sexe</label>
                    <select required name="gender" value={form.gender} onChange={handleChange} className={inputClass}>
                      <option value="">Sélectionner</option>
                      <option value="Homme">Homme</option>
                      <option value="Femme">Femme</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Profession</label>
                    <input required name="profession" value={form.profession} onChange={handleChange} className={inputClass} placeholder="Ex : Étudiant, Enseignant..." />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Ville</label>
                    <input required name="city" value={form.city} onChange={handleChange} className={inputClass} placeholder="Ouagadougou" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Téléphone</label>
                    <input required type="tel" name="phone" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+226 XX XX XX XX" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Numéro WhatsApp</label>
                    <input required type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} className={inputClass} placeholder="+226 XX XX XX XX" />
                  </div>
                  <div className="sm:col-span-2 flex flex-col gap-2">
                    <label className={labelClass}>Adresse e-mail</label>
                    <input required type="email" name="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="vous@exemple.com" />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className={labelClass}>Votre motivation</label>
                  <textarea
                    required name="motivation" rows="4" value={form.motivation} onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="Pourquoi souhaitez-vous rejoindre Solidarity Group ?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="glow-pink w-full bg-[#D6336C] hover:bg-[#B36CB2] text-white font-semibold py-3.5 rounded-xl mt-2 transition-colors disabled:opacity-60"
                >
                  {submitting ? 'Envoi...' : 'Soumettre ma candidature'}
                </button>
              </form>
            </ScrollReveal>
          )
        ) : (
          // ---- Adhésions fermées : message + liste d'attente ----
          <ScrollReveal delay={100}>
            <div className="flex flex-col gap-6">
              <div className="bg-white rounded-3xl border border-gray-100 p-8 text-center flex flex-col items-center gap-3">
                <Clock size={40} className="text-[#B36CB2]" />
                <h3 className="text-lg font-bold text-gray-800">Les adhésions sont actuellement fermées</h3>
                <p className="text-sm text-gray-500 max-w-md">
                  Notre prochaine campagne d'adhésion débutera le{' '}
                  <span className="font-semibold text-[#D6336C]">
                    {new Date(settings.campaignStart).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>. Laissez-nous vos coordonnées pour être recontacté(e) dès l'ouverture.
                </p>
              </div>

              {waitlisted ? (
                <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center text-sm text-gray-600">
                  Merci ! Nous vous recontacterons dès l'ouverture de la prochaine campagne.
                </div>
              ) : (
                <form onSubmit={handleWaitlistSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Nom complet</label>
                    <input
                      required value={waitForm.name}
                      onChange={(e) => setWaitForm({ ...waitForm, name: e.target.value })}
                      className={inputClass} placeholder="Votre nom"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className={labelClass}>Numéro WhatsApp</label>
                    <input
                      required type="tel" value={waitForm.whatsapp}
                      onChange={(e) => setWaitForm({ ...waitForm, whatsapp: e.target.value })}
                      className={inputClass} placeholder="+226 XX XX XX XX"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#B36CB2] hover:bg-[#D6336C] text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60"
                  >
                    {submitting ? 'Envoi...' : "M'inscrire sur la liste d'attente"}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  )
}

export default JoinUs