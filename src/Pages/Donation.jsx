import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, HeartHandshake, Smartphone, CreditCard, PhoneCall, Mail, MessageCircle, ShieldCheck } from "lucide-react";
import Footer from "../Components/Footer.jsx";

const phone = "+226 58 47 49 75";
const email = "solidaritygroupbf@yahoo.com";

export default function Donation() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#D6336C]"><ArrowLeft size={17}/> Accueil</Link>
          <span className="font-montserrat text-sm font-extrabold tracking-tight">SOLIDARITY <span className="text-[#D6336C]">GROUP</span></span>
        </div>
      </header>
      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-[#fff4f7] via-white to-[#f7eff9] px-5 py-16 sm:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-bold text-[#D6336C] shadow-sm"><HeartHandshake size={15}/> Votre générosité fait la différence</span>
              <h1 className="mt-6 max-w-xl font-fraunces text-4xl font-bold leading-tight text-gray-900 sm:text-6xl">Un geste de solidarité, un impact durable.</h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-gray-600">Votre don contribue à soutenir nos actions auprès des jeunes, des orphelins, des personnes malades et des personnes déplacées internes au Burkina Faso.</p>
              <a href={`tel:${phone.replaceAll(" ", "")}`} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#D6336C] px-6 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#B36CB2]"><PhoneCall size={18}/> Contacter l’association</a>
            </div>
            <div className="rounded-[2rem] bg-white p-7 shadow-xl shadow-[#D6336C]/10 sm:p-10">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D6336C]/10 text-[#D6336C]"><HeartHandshake size={28}/></div>
              <h2 className="text-2xl font-bold text-gray-900">Comment faire un don ?</h2>
              <p className="mt-3 text-sm leading-6 text-gray-500">Nos paiements en ligne ne sont pas encore activés. Contactez directement notre équipe pour connaître les modalités et effectuer votre don en toute sécurité.</p>
              <div className="mt-7 space-y-4">
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-50 text-green-700"><Smartphone size={23}/></div>
                  <div><p className="font-bold text-gray-800">Mobile Money</p><p className="mt-1 text-xs leading-5 text-gray-500">Orange Money, Moov Money et autres opérateurs : contactez-nous pour obtenir les instructions.</p></div>
                  <span className="ml-auto rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">À organiser</span>
                </div>
                <div className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><CreditCard size={23}/></div>
                  <div><p className="font-bold text-gray-800">Carte Visa</p><p className="mt-1 text-xs leading-5 text-gray-500">Le paiement par carte sera proposé lorsque la solution sécurisée sera configurée.</p></div>
                  <span className="ml-auto rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-amber-700">À venir</span>
                </div>
              </div>
              <div className="mt-7 rounded-2xl bg-[#fbf7fb] p-5">
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Contact dons</p>
                <a href={`tel:${phone.replaceAll(" ", "")}`} className="mt-2 flex items-center gap-2 text-lg font-extrabold text-[#D6336C]"><PhoneCall size={18}/>{phone}</a>
                <a href={`mailto:${email}?subject=Demande%20de%20don`} className="mt-2 flex items-center gap-2 text-sm text-gray-600 hover:text-[#D6336C]"><Mail size={16}/>{email}</a>
                <a href={`https://wa.me/22658474975?text=Bonjour%2C%20je%20souhaite%20faire%20un%20don%20%C3%A0%20Solidarity%20Group.`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-green-700 hover:underline"><MessageCircle size={17}/> Nous écrire sur WhatsApp</a>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-5xl px-5 py-14 text-center">
          <ShieldCheck className="mx-auto text-[#B36CB2]" size={30}/>
          <h2 className="mt-4 text-xl font-bold text-gray-900">Un don en toute transparence</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500">Aucun paiement n’est collecté sur cette page. Avant tout transfert, prenez contact avec l’association afin de confirmer le bénéficiaire et les modalités du don. Merci de contribuer à nos actions solidaires.</p>
          <Link to="/" className="mt-7 inline-flex rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:border-[#D6336C] hover:text-[#D6336C]">Découvrir nos actions</Link>
        </section>
      </main>
      <Footer/>
    </div>
  );
}
