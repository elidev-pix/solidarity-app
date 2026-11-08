import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Clock, Send } from "lucide-react";
import { membershipRequestApi, settingsApi } from "../services/api.js";
import { Skeleton } from "../Components/ui/skeleton.jsx";
import ScrollReveal from "../Components/ScrollReveal.jsx";

const inputClass = "w-full min-w-0 rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 placeholder-gray-300 outline-none transition focus:border-[#D6336C] focus:ring-2 focus:ring-[#D6336C]/10";
const labelClass = "text-sm font-semibold text-gray-600";

function JoinUs() {
  const [settings, setSettings] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState({
    firstName: "", lastName: "", birthDate: "", gender: "", profession: "",
    phone: "", whatsapp: "", email: "", city: "", motivation: "",
  });

  useEffect(() => {
    let active = true;
    settingsApi.get()
      .then(({ data }) => { if (active) setSettings(data); })
      .catch((requestError) => {
        console.error("Impossible de charger la période d'adhésion :", requestError);
        if (active) setError("Impossible de vérifier la période d'adhésion. Veuillez réessayer plus tard.");
      })
      .finally(() => { if (active) setSettingsLoading(false); });
    return () => { active = false; };
  }, []);

  const start = settings?.membershipPeriodStart ? new Date(settings.membershipPeriodStart) : null;
  const end = settings?.membershipPeriodEnd ? new Date(settings.membershipPeriodEnd) : null;
  const endOfCampaign = end ? new Date(end) : null;
  if (endOfCampaign) endOfCampaign.setHours(23, 59, 59, 999);
  const registrationOpen = Boolean(start && endOfCampaign && !Number.isNaN(start.getTime()) && !Number.isNaN(endOfCampaign.getTime()) && new Date() >= start && new Date() <= endOfCampaign);

  function handleChange(event) {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const fullName = `${form.firstName.trim()} ${form.lastName.trim()}`.trim();
      const { data } = await membershipRequestApi.create({
        fullName, email: form.email.trim(), phone: form.phone.trim(),
        whatsapp: form.whatsapp.trim(), birthDate: form.birthDate || null,
        gender: form.gender, profession: form.profession.trim(),
        city: form.city.trim(), motivation: form.motivation.trim(),
      });
      setSuccessMessage(data.message || (registrationOpen ? "Votre demande a bien été envoyée." : "Votre demande a été ajoutée à la liste d'attente."));
      setSubmitted(true);
    } catch (requestError) {
      console.error("Envoi de la demande impossible :", requestError);
      setError(requestError.response?.data?.message || "Impossible d'envoyer votre demande. Vérifiez votre connexion et réessayez.");
    } finally {
      setSubmitting(false);
    }
  }

  if (settingsLoading) {
    return <div className="min-h-screen bg-gray-50 px-4 py-16"><div className="mx-auto flex max-w-2xl flex-col gap-4"><Skeleton className="mx-auto h-10 w-2/3" /><Skeleton className="h-4 w-full" /><div className="mt-6 flex flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-6 sm:p-8"><Skeleton className="h-12 w-full" /><Skeleton className="h-12 w-full" /><Skeleton className="h-32 w-full" /></div></div></div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-3xl">
        <ScrollReveal><div className="mb-8 text-center sm:mb-10">
          <span className="font-fraunces text-3xl font-semibold text-[#D6336C] sm:text-4xl">Rejoindre Solidarity Group</span>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">Devenez acteur du changement au sein de notre communauté engagée.</p>
          <p className="mt-4 text-sm text-gray-600">Déjà membre ? <Link to="/login" className="font-semibold text-[#D6336C] hover:underline">Connectez-vous à votre compte</Link></p>
        </div></ScrollReveal>

        {submitted ? (
          <div className="flex flex-col items-center gap-4 rounded-3xl border border-gray-100 bg-white p-7 text-center shadow-sm sm:p-10">
            <CheckCircle2 size={48} className="text-[#D6336C]" />
            <h2 className="text-xl font-bold text-gray-800">{registrationOpen ? "Candidature envoyée !" : "Inscription sur la liste d'attente enregistrée !"}</h2>
            <p className="max-w-md text-sm leading-6 text-gray-500">{successMessage}</p>
            <p className="max-w-md text-xs text-gray-400">Un message de confirmation sera envoyé à votre adresse e-mail si le service de messagerie est configuré.</p>
            <Link to="/" className="mt-2 rounded-full bg-[#D6336C] px-5 py-3 text-sm font-semibold text-white">Retour à l'accueil</Link>
          </div>
        ) : (
          <ScrollReveal delay={100}>
            <form onSubmit={handleSubmit} className="flex min-w-0 flex-col gap-5 rounded-3xl border border-gray-100 bg-white p-5 shadow-sm sm:p-8">
              <div className={`flex items-start gap-3 rounded-2xl p-4 ${registrationOpen ? "bg-green-50 text-green-800" : "bg-purple-50 text-purple-800"}`}>
                {registrationOpen ? <CheckCircle2 size={20} className="mt-0.5 shrink-0" /> : <Clock size={20} className="mt-0.5 shrink-0" />}
                <div><p className="text-sm font-semibold">{registrationOpen ? "Campagne d'adhésion ouverte" : "Hors période d'adhésion"}</p><p className="mt-1 text-xs leading-5 opacity-80">{registrationOpen ? "Votre candidature sera transmise à l'équipe pour examen." : "Vous pouvez soumettre vos coordonnées : votre demande sera enregistrée sur la liste d'attente."}</p>
                  {start && end && <p className="mt-1 text-xs opacity-70">Période : {start.toLocaleDateString("fr-FR")} – {end.toLocaleDateString("fr-FR")}</p>}
                </div>
              </div>
              <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-2">
                <label className="min-w-0 space-y-2"><span className={labelClass}>Prénom *</span><input required name="firstName" autoComplete="given-name" value={form.firstName} onChange={handleChange} className={inputClass} placeholder="Votre prénom" /></label>
                <label className="min-w-0 space-y-2"><span className={labelClass}>Nom *</span><input required name="lastName" autoComplete="family-name" value={form.lastName} onChange={handleChange} className={inputClass} placeholder="Votre nom" /></label>
                <label className="min-w-0 space-y-2"><span className={labelClass}>Date de naissance</span><input type="date" name="birthDate" value={form.birthDate} onChange={handleChange} className={inputClass} /></label>
                <label className="min-w-0 space-y-2"><span className={labelClass}>Sexe</span><select name="gender" value={form.gender} onChange={handleChange} className={inputClass}><option value="">Sélectionner</option><option value="Homme">Homme</option><option value="Femme">Femme</option><option value="Autre">Autre</option></select></label>
                <label className="min-w-0 space-y-2"><span className={labelClass}>Profession</span><input name="profession" value={form.profession} onChange={handleChange} className={inputClass} placeholder="Étudiant, enseignant..." /></label>
                <label className="min-w-0 space-y-2"><span className={labelClass}>Ville *</span><input required name="city" value={form.city} onChange={handleChange} className={inputClass} placeholder="Ouagadougou" /></label>
                <label className="min-w-0 space-y-2"><span className={labelClass}>Téléphone *</span><input required type="tel" name="phone" autoComplete="tel" value={form.phone} onChange={handleChange} className={inputClass} placeholder="+226 XX XX XX XX" /></label>
                <label className="min-w-0 space-y-2"><span className={labelClass}>Numéro WhatsApp</span><input type="tel" name="whatsapp" value={form.whatsapp} onChange={handleChange} className={inputClass} placeholder="+226 XX XX XX XX" /></label>
                <label className="min-w-0 space-y-2 sm:col-span-2"><span className={labelClass}>Adresse e-mail *</span><input required type="email" name="email" autoComplete="email" value={form.email} onChange={handleChange} className={inputClass} placeholder="vous@exemple.com" /></label>
              </div>
              <label className="space-y-2"><span className={labelClass}>Votre motivation *</span><textarea required name="motivation" rows={5} value={form.motivation} onChange={handleChange} className={`${inputClass} resize-y`} placeholder="Pourquoi souhaitez-vous rejoindre Solidarity Group ?" /></label>
              {error && <p role="alert" className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#D6336C] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#B36CB2] disabled:cursor-not-allowed disabled:opacity-60"><Send size={16} />{submitting ? "Envoi en cours..." : registrationOpen ? "Soumettre ma candidature" : "M'inscrire sur la liste d'attente"}</button>
            </form>
          </ScrollReveal>
        )}
      </div>
    </div>
  );
}

export default JoinUs;