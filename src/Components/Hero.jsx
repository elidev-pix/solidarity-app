import React from "react";

function Hero() {
  return (
    <div>
      <div className="mb-2 text-center">
        <span className="font-semibold font-fraunces text-[#D6336C] text-3xl sm:text-4xl">
          Actualités
        </span>
      </div>
      <section className="flex justify-center items-center bg-[#D6336C] py-8 sm:py-10 px-4">
        <div className="flex flex-col lg:flex-row gap-5 w-full max-w-6xl">

          {/* Grande carte */}
          <div className="relative overflow-hidden rounded-3xl w-full lg:w-2/3">
            <img
              src="/don1.jpg"
              alt="Hero"
              className="w-full h-64 sm:h-80 lg:h-104 object-cover"
            />
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6">
              <span className="bg-[#D6336C] text-white px-4 py-2 rounded-full text-xs font-semibold">
                Humanitaire
              </span>
              <h2 className="mt-4 max-w-lg text-xl sm:text-3xl font-bold text-white">
                Distribution de vivres aux orphelinats
              </h2>
              <p className="mt-2 text-sm text-gray-200">Il y a 4 jours</p>
            </div>
          </div>

          {/* Colonne droite */}
          <div className="flex flex-col gap-4 w-full lg:w-1/3">
            {[
              { img: "/don2.jpg", tag: "Sanitaire", title: "Distribution de masques aux hôpitaux", time: "Il y a 4 jours" },
              { img: "/don3.jpg", tag: "Eau", title: "Construction d'un forage", time: "Il y a 1 semaine" },
              { img: "/don4.jpg", tag: "Sport", title: "Match caritatif entre jeunes", time: "Il y a 2 semaines" },
            ].map(({ img, tag, title, time }) => (
              <div key={title} className="flex h-28 sm:h-32 w-full overflow-hidden rounded-2xl bg-white">
                <img src={img} alt="" className="w-24 sm:w-28 object-cover shrink-0" />
                <div className="flex flex-col justify-center p-3 sm:p-4 min-w-0">
                  <span className="text-xs font-semibold text-[#D6336C]">{tag}</span>
                  <h3 className="mt-1 text-sm font-bold truncate">{title}</h3>
                  <p className="mt-2 text-xs text-gray-500">{time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Hero;