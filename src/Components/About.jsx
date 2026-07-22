import React from "react";

function About() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-16 text-center">
          <span className="font-semibold font-fraunces text-[#D6336C] text-4xl">
            À propos de nous
          </span>

          <h2 className="mt-4 text-4xl font-bold text-gray-900">
            Des jeunes unis pour bâtir une société
            <br />
            plus solidaire et inclusive.
          </h2>
        </div>

        {/* Contenu */}
        <div className="grid items-center gap-14 lg:grid-cols-2">

          {/* Images */}
          <div className="grid grid-cols-2 gap-5">
            <img
              src="/don1.jpg"
              alt=""
              className="h-80 w-full rounded-3xl object-cover"
            />

            <img
              src="/don2.jpg"
              alt=""
              className="mt-12 h-80 w-full rounded-3xl object-cover"
            />
          </div>

          {/* Texte */}
          <div className="space-y-6">

            <h3 className="text-3xl font-bold text-gray-900">
              Notre histoire
            </h3>

            <p className="leading-8 text-gray-600">
              Solidarity Group est une organisation apolitique et à but non
              lucratif créée en 2022, regroupant des élèves, étudiants et
              jeunes professionnels engagés pour la solidarité, le
              vivre-ensemble et le développement durable au Burkina Faso.
            </p>

            <p className="leading-8 text-gray-600">
              Notre mission est d’apporter un soutien concret aux personnes
              vulnérables, en particulier les enfants malades, les orphelins et
              les déplacés internes, à travers des actions sociales,
              humanitaires et environnementales.
            </p>

            <button className="rounded-full bg-[#D6336C] px-6 py-3 font-semibold text-white transition hover:bg-[#B36CB2]">
              Découvrir nos actions
            </button>

          </div>
        </div>

        {/* Statistiques */}
        <div className="mt-20 grid grid-cols-2 gap-6 md:grid-cols-4">

          <div className="rounded-3xl bg-gray-50 p-6 text-center">
            <h4 className="text-4xl font-bold text-[#D6336C]">2022</h4>
            <p className="mt-2 text-gray-600">Fondation</p>
          </div>

          <div className="rounded-3xl bg-gray-50 p-6 text-center">
            <h4 className="text-4xl font-bold text-[#D6336C]">50+</h4>
            <p className="mt-2 text-gray-600">Bénévoles</p>
          </div>

          <div className="rounded-3xl bg-gray-50 p-6 text-center">
            <h4 className="text-4xl font-bold text-[#D6336C]">20+</h4>
            <p className="mt-2 text-gray-600">Actions</p>
          </div>

          <div className="rounded-3xl bg-gray-50 p-6 text-center">
            <h4 className="text-4xl font-bold text-[#D6336C]">1000+</h4>
            <p className="mt-2 text-gray-600">Bénéficiaires</p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default About;