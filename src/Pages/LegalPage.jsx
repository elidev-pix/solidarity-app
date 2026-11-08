import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck, FileText, Scale } from "lucide-react";
import Footer from "../Components/Footer.jsx";

const content = {
  legal: {
    title: "Mentions légales",
    intro: "Informations relatives à l’éditeur du site et à son fonctionnement.",
    icon: FileText,
    sections: [
      ["Éditeur du site", "Le présent site est édité par Solidarity Group, organisation apolitique et à but non lucratif engagée depuis 2022 dans des actions de solidarité au Burkina Faso."],
      ["Coordonnées", "Adresse e-mail : solidaritygroupbf@yahoo.com. Téléphone : +226 58 47 49 75. Localisation : Ouagadougou, Burkina Faso."],
      ["Directeur de publication", "La publication du site est assurée par l’équipe responsable de Solidarity Group. Les informations nominatives du représentant légal et les références d’enregistrement de l’association pourront être ajoutées après validation par l’association."],
      ["Hébergement", "Le site est hébergé par des prestataires techniques tiers pour le déploiement de l’application et le stockage de certains contenus. Les coordonnées contractuelles de l’hébergeur peuvent être communiquées sur demande."],
      ["Propriété intellectuelle", "Les textes, éléments graphiques, logos et contenus publiés sur ce site sont destinés à présenter les activités de Solidarity Group. Toute reproduction ou réutilisation substantielle nécessite l’autorisation préalable de leurs titulaires, sauf exception prévue par la loi."],
      ["Contact", "Pour toute question relative au site ou à ces mentions, vous pouvez écrire à solidaritygroupbf@yahoo.com."]
    ]
  },
  terms: {
    title: "Conditions générales d’utilisation",
    intro: "Les règles applicables à l’accès et à l’utilisation du site Solidarity Group.",
    icon: Scale,
    sections: [
      ["Objet", "Les présentes conditions encadrent l’accès au site et à ses fonctionnalités publiques : consultation des actualités, des événements, présentation des actions et prise de contact avec l’association."],
      ["Acceptation", "En naviguant sur le site, l’utilisateur reconnaît avoir pris connaissance des présentes conditions. S’il ne les accepte pas, il est invité à ne pas utiliser les services concernés."],
      ["Accès au site", "Solidarity Group s’efforce de maintenir le site accessible. Des interruptions temporaires peuvent toutefois survenir pour maintenance, mise à jour ou en raison d’événements indépendants de sa volonté."],
      ["Utilisation autorisée", "L’utilisateur s’engage à fournir des informations exactes lorsqu’il utilise un formulaire, à respecter les droits des tiers et à ne pas perturber le fonctionnement du site ni tenter d’accéder sans autorisation à ses espaces protégés."],
      ["Espace membre", "Lorsque des identifiants sont attribués, l’utilisateur est responsable de leur confidentialité et doit signaler rapidement toute utilisation non autorisée de son compte. Les fonctionnalités réservées aux membres sont soumises aux règles internes de l’association."],
      ["Dons et paiements", "Le site ne propose actuellement aucun paiement en ligne. Les mentions Mobile Money et Visa présentées sur la page de don indiquent des moyens envisagés, mais aucun paiement ne peut être initié ou confirmé depuis le site. Les modalités doivent être convenues directement avec l’association."],
      ["Responsabilité et évolution", "Les informations sont publiées à titre informatif et peuvent être mises à jour. Solidarity Group ne garantit pas l’absence d’erreurs ou d’interruptions et se réserve le droit de faire évoluer le site et ses fonctionnalités."],
      ["Contact", "Pour toute question concernant ces conditions, contactez solidaritygroupbf@yahoo.com ou le +226 58 47 49 75."]
    ]
  },
  privacy: {
    title: "Politique de confidentialité",
    intro: "Comment les informations transmises à Solidarity Group sont utilisées et protégées.",
    icon: ShieldCheck,
    sections: [
      ["Responsable du traitement", "Les informations recueillies via ce site sont traitées par Solidarity Group, organisation à but non lucratif basée à Ouagadougou, Burkina Faso. Contact : solidaritygroupbf@yahoo.com."],
      ["Données susceptibles d’être collectées", "Selon le formulaire utilisé, le site peut recueillir des informations d’identification et de contact (nom, adresse e-mail, téléphone, ville), des informations communiquées dans une demande d’adhésion, ainsi que les données nécessaires à la gestion des comptes membres."],
      ["Finalités", "Ces données sont utilisées pour répondre aux demandes, examiner les candidatures d’adhésion, gérer les comptes membres, organiser les activités, assurer le suivi des cotisations et communiquer les informations relatives aux actions de l’association."],
      ["Base et caractère des données", "Les informations sont fournies directement par l’utilisateur lorsqu’il remplit un formulaire ou contacte l’association. Les champs obligatoires sont signalés dans les formulaires ; leur absence peut empêcher le traitement de la demande."],
      ["Destinataires et prestataires", "Les données sont accessibles uniquement aux personnes habilitées au sein de l’association et, lorsque cela est nécessaire, aux prestataires techniques qui assurent l’hébergement, le stockage ou l’envoi d’e-mails. Elles ne sont pas destinées à être vendues."],
      ["Conservation et sécurité", "Les données sont conservées pendant la durée nécessaire aux finalités poursuivies, puis supprimées ou archivées lorsque cela est approprié. Solidarity Group met en œuvre des mesures raisonnables pour protéger les informations contre l’accès, la perte ou la divulgation non autorisés."],
      ["Droits et demandes", "Pour demander l’accès, la rectification ou la suppression de vos informations, ou poser une question sur leur utilisation, contactez solidaritygroupbf@yahoo.com. Votre demande sera examinée conformément aux règles applicables en matière de protection des données."],
      ["Cookies et services tiers", "Le fonctionnement technique du site peut nécessiter des éléments de stockage ou des services tiers. Cette politique sera complétée si des outils de mesure d’audience ou de publicité sont ajoutés."],
      ["Mise à jour", "Cette politique peut évoluer avec les fonctionnalités du site et les obligations applicables. La version publiée sur cette page est la version en vigueur."]
    ]
  }
};

export default function LegalPage({ type = "legal" }) {
  const page = content[type] || content.legal;
  const Icon = page.icon;
  return (
    <div className="min-h-screen bg-[#faf9fb]">
      <header className="bg-white border-b border-gray-100">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#D6336C]"><ArrowLeft size={17}/> Retour à l’accueil</Link>
          <span className="text-sm font-bold tracking-wide text-[#D6336C]">SOLIDARITY GROUP</span>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
        <div className="mb-10">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#D6336C]/10 text-[#D6336C]"><Icon size={27}/></div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#B36CB2]">Solidarity Group · Informations</p>
          <h1 className="font-fraunces text-3xl font-bold text-gray-900 sm:text-5xl">{page.title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500">{page.intro}</p>
        </div>
        <div className="space-y-7 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-10">
          {page.sections.map(([heading, body], index) => (
            <section key={heading}>
              <h2 className="mb-2 text-base font-bold text-gray-900">{index + 1}. {heading}</h2>
              <p className="text-sm leading-7 text-gray-600">{body}</p>
            </section>
          ))}
          <p className="border-t border-gray-100 pt-5 text-xs text-gray-400">Dernière mise à jour : novembre 2026.</p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4 text-sm">
          <Link to="/mentions-legales" className="text-[#D6336C] hover:underline">Mentions légales</Link>
          <Link to="/conditions-generales-utilisation" className="text-[#D6336C] hover:underline">Conditions d’utilisation</Link>
          <Link to="/politique-confidentialite" className="text-[#D6336C] hover:underline">Confidentialité</Link>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
