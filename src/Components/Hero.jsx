import React from "react";

function Hero() {
  return (
    <div>
      <div className="mb-2 text-center">
          <span className="font-semibold font-fraunces text-[#D6336C] text-4xl">
            Actualités
          </span>
      </div>
      <section className="flex justify-center items-center bg-[#D6336C] py-10">
        <div className="flex gap-5">

          {/* Grande carte */}
          <div className="relative overflow-hidden rounded-3xl">
            <img
              src="/don1.jpg"
              alt="Hero"
              className="w-176 h-104 object-cover"
            />

            <div className="absolute bottom-6 left-6">
              <span className="bg-[#D6336C] text-white px-4 py-2 rounded-full text-xs font-semibold">
                Humanitaire
              </span>

              <h2 className="mt-4 max-w-lg text-3xl font-bold text-white">
                Distribution de vivres aux orphelinats
              </h2>

              <p className="mt-2 text-sm text-gray-200">
                Il y a 4 jours
              </p>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col gap-4">

            {/* Carte */}
            <div className="flex h-32 w-80 overflow-hidden rounded-2xl bg-white">
              <img
                src="/don2.jpg"
                alt=""
                className="w-28 object-cover"
              />

              <div className="flex flex-col justify-center p-4">
                <span className="text-xs font-semibold text-[#D6336C]">
                  Sanitaire
                </span>

                <h3 className="mt-1 text-sm font-bold">
                  Distribution de masques aux hôpitaux
                </h3>

                <p className="mt-2 text-xs text-gray-500">
                  Il y a 4 jours
                </p>
              </div>
            </div>

            {/* Carte */}
            <div className="flex h-32 w-80 overflow-hidden rounded-2xl bg-white">
              <img
                src="/don3.jpg"
                alt=""
                className="w-28 object-cover"
              />

              <div className="flex flex-col justify-center p-4">
                <span className="text-xs font-semibold text-[#D6336C]">
                  Eau
                </span>

                <h3 className="mt-1 text-sm font-bold">
                  Construction d'un forage
                </h3>

                <p className="mt-2 text-xs text-gray-500">
                  Il y a 1 semaine
                </p>
              </div>
            </div>

            {/* Carte */}
            <div className="flex h-32 w-80 overflow-hidden rounded-2xl bg-white">
              <img
                src="/don4.jpg"
                alt=""
                className="w-28 object-cover"
              />

              <div className="flex flex-col justify-center p-4">
                <span className="text-xs font-semibold text-[#D6336C]">
                  Sport
                </span>

                <h3 className="mt-1 text-sm font-bold">
                  Match caritatif entre jeunes
                </h3>

                <p className="mt-2 text-xs text-gray-500">
                  Il y a 2 semaines
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
    
  );
}

export default Hero;