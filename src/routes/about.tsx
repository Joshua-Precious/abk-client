import { useState } from "react";
import Header from "../components/blocks/Header";
import Footer from "../components/blocks/Footer";

export default function About() {
  const [isHallOfFameOpen, setIsHallOfFameOpen] = useState(true);

  const hallOfFameWinners = [
    {
      year: "2017",
      team: "Spiders",
      image:
        "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/Hall%20of%20Fame/2017w.webp",
    },
    {
      year: "2018",
      team: "Stratos",
      image:
        "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/Hall%20of%20Fame/2018%20w.webp",
    },
    {
      year: "2019",
      team: "Spiders",
      image:
        "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/Hall%20of%20Fame/2019%20win.webp",
    },
    {
      year: "2022",
      team: "Spiders",
      image:
        "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/Hall%20of%20Fame/2022w.webp",
    },
    {
      year: "2023",
      team: "Spiders",
      image:
        "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/Hall%20of%20Fame/2023w.webp",
    },
    {
      year: "2024",
      team: "Team Hubes",
      image:
        "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/Hall%20of%20Fame/2024w.webp",
    },
    {
      year: "2025",
      team: "Gazelles",
      image:
        "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/Hall%20of%20Fame/2025w.webp",
    },
    {
      year: "2026",
      team: "Uptek Dance Academy",
      image:
        "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/Hall%20of%20Fame/ABK%202026%20FIRSTLOVE%20CHURCH%20DAG%20HEWARD-MILLS.jpg.jpeg",
    },
  ];

  const gradientButtonStyle = {
    background:
      "linear-gradient(#05070a, #05070a) padding-box, linear-gradient(90deg, #ff3b00, #ff1f5b, #7a2cff, #00f0ff) border-box",
    border: "3px solid transparent",
  };

  return (
    <div className="flex flex-col min-h-screen text-neutral-content">
      <Header />

      <main className="pt-28 md:pt-32 grow relative z-10 container mx-auto px-4 pb-20">
        {/* ABOUT Title */}
        <div className="text-center mb-10 md:mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-[#f0b405] tracking-wider uppercase mb-2">
            About ABK
          </h1>
        </div>

        {/* About Content & Image Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mb-20 max-w-6xl mx-auto">
          <div className="lg:col-span-7 flex flex-col gap-6 text-white/95 text-base md:text-lg leading-relaxed uppercase font-medium">
            <p>
              Dance in Ghana has never had a stage this big. Accra's Boogie King
              reframes dance from a regular dance moment into a nationally
              significant, cultural and energetic experience, part live
              competition, part concert. This is a leap within the creative arts
              industry to help foster emerging talents in the creative landscape
              and further position the creative arts as an economic driving
              force.
            </p>
            <p>
              ABK is more than a competition. It is a platform for talent
              discovery, youth empowerment, creative expression, entertainment
              and community building.
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md aspect-4/3 rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl hover:border-[#f0b405]/50 transition-colors duration-300">
              <img
                src="https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2023/ACCRA'S%20BOOGIE%20KING%2023%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_107%201.webp"
                alt="Accra's Boogie King Dancers"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* HALL OF FAME Tab/Button */}
        <section className="flex flex-col items-center mb-16">
          <button
            onClick={() => setIsHallOfFameOpen(!isHallOfFameOpen)}
            className="relative group px-12 py-4 rounded-xl font-extrabold text-2xl md:text-3xl text-white tracking-widest overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer inline-flex items-center justify-center min-w-70 md:min-w-[320px] shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            style={gradientButtonStyle}
          >
            HALL OF FAME
          </button>

          {/* Hall of Fame Grid Content */}
          <div
            className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${isHallOfFameOpen ? "max-h-[2000px] opacity-100 mt-10" : "max-h-0 opacity-0 pointer-events-none"}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-12 pt-12 max-w-6xl mx-auto px-6 md:px-4">
              {hallOfFameWinners
                .slice()
                .reverse()
                .map((winner, index) => {
                  const isCurrentChampion = index === 0;
                  return (
                  <div
                    key={winner.year}
                    className={`group relative rounded-2xl liquid-glass border p-4 transition-all duration-300 hover:-translate-y-2 ${isCurrentChampion ? "overflow-visible border-[#f0b405]/70 shadow-[0_10px_40px_rgba(240,180,5,0.35)] ring-1 ring-[#f0b405]/50" : "overflow-hidden border-white/10 hover:shadow-[0_10px_30px_rgba(240,180,5,0.2)]"}`}
                  >
                    {isCurrentChampion && (
                      <img
                        src="/Crown.webp"
                        alt="Reigning champion crown"
                        className="absolute -top-12 md:-top-14 -left-8 md:-left-10 w-32 md:w-40 z-30 pointer-events-none -rotate-12 drop-shadow-[0_6px_12px_rgba(0,0,0,0.65)] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-0"
                        loading="eager"
                      />
                    )}
                    <div className={`relative aspect-square rounded-xl overflow-hidden mb-4 border bg-neutral/50 ${isCurrentChampion ? "border-[#f0b405]/60" : "border-white/10"}`}>
                      <img
                        src={winner.image}
                        alt={`${winner.team} (${winner.year})`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-[#f0b405] text-black font-extrabold px-3 py-1 rounded-md text-sm shadow-md">
                        {winner.year}
                      </div>
                      {isCurrentChampion && (
                        <div className="absolute top-2 right-2 bg-black/70 backdrop-blur-sm text-[#f0b405] font-extrabold px-3 py-1 rounded-md text-[11px] tracking-widest uppercase border border-[#f0b405]/60 shadow-md">
                          Reigning
                        </div>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-white tracking-wide uppercase group-hover:text-[#f0b405] transition-colors">
                        {winner.team}
                      </h3>
                      <p className="text-xs text-white/50 tracking-widest mt-1 uppercase font-semibold">
                        CHAMPION
                      </p>
                    </div>
                  </div>
                  );
                })}
            </div>
          </div>
        </section>

        {/* SPONSOR ABK Button - Hidden: no longer taking sponsors */}
        {/* <section className="flex justify-center mb-8">
          <button
            className="relative group px-12 py-5 rounded-xl font-extrabold text-2xl md:text-3xl text-white tracking-widest overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer inline-flex items-center justify-center min-w-70 md:min-w-[320px] shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            style={gradientButtonStyle}
          >
            SPONSOR ABK
          </button>
        </section> */}
      </main>

      <Footer />
    </div>
  );
}
