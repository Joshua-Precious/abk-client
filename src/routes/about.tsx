import { useState } from "react";
import Header from "../components/blocks/Header";
import Footer from "../components/blocks/Footer";

export default function About() {
  const [isHallOfFameOpen, setIsHallOfFameOpen] = useState(true);
  const [isGalleryOpen, setIsGalleryOpen] = useState(true);

  // Lightbox Modal state
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

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
  ];

  const galleryData = {
    "2022": [
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2022/ABK22%20147.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2022/ABK22%20164.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2022/ABK22%20287.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2022/ABK22%20291.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2022/ABK22%20313.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2022/ABK22%20335.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2022/ABK22%20341.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2022/ABK22%2082.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2022/ABK22%2092.webp",
    ],
    "2023": [
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2023/ACCRA'S%20BOOGIE%20KING%2023%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_107%201.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2023/ACCRA'S%20BOOGIE%20KING%2023%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_122%201.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2023/ACCRA'S%20BOOGIE%20KING%2023%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_145.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2023/ACCRA'S%20BOOGIE%20KING%2023%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_183.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2023/ACCRA'S%20BOOGIE%20KING%2023%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_225.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2023/ACCRA'S%20BOOGIE%20KING%2023%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_232.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2023/ACCRA'S%20BOOGIE%20KING%2023%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_74%201.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2023/ACCRA'S%20BOOGIE%20KING%20FIRST%20LOVE%20CHURCH%20%20DAG%20HEWARD-MILLS_56.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2023/ACCRA'S%20BOOGIE%20KING%20FIRST%20LOVE%20CHURCH%20%20DAG%20HEWARD-MILLS_68.webp",
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2023/ACCRA'S%20BOOGIE%20KING%20FIRST%20LOVE%20CHURCH%20%20DAG%20HEWARD-MILLS_72.webp",
    ],
    "2024": [
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/Hall%20of%20Fame/2024w.webp",
    ],
    "2025": [
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/Hall%20of%20Fame/2025w.webp",
    ],
  };

  const galleryThumbnails = {
    "2022":
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2022/ABK22%20147.webp",
    "2023":
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/2023/ACCRA'S%20BOOGIE%20KING%2023%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_145.webp",
    "2024":
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/Hall%20of%20Fame/2024w.webp",
    "2025":
      "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/Hall%20of%20Fame/2025w.webp",
  };

  const gradientButtonStyle = {
    background:
      "linear-gradient(#05070a, #05070a) padding-box, linear-gradient(90deg, #ff3b00, #ff1f5b, #7a2cff, #00f0ff) border-box",
    border: "3px solid transparent",
  };

  return (
    <div className="flex flex-col min-h-screen text-neutral-content">
      <Header />

      <main className="pt-28 md:pt-36 grow relative z-10 container mx-auto px-4 pb-20">
        {/* ABOUT Title */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl md:text-8xl font-bold text-[#f0b405] tracking-wider uppercase mb-2">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
              {hallOfFameWinners
                .slice()
                .reverse()
                .map((winner) => (
                  <div
                    key={winner.year}
                    className="group relative rounded-2xl overflow-hidden liquid-glass border border-white/10 p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(240,180,5,0.2)]"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-4 border border-white/10 bg-neutral/50">
                      <img
                        src={winner.image}
                        alt={`${winner.team} (${winner.year})`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-2 left-2 bg-[#f0b405] text-black font-extrabold px-3 py-1 rounded-md text-sm shadow-md">
                        {winner.year}
                      </div>
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
                ))}
            </div>
          </div>
        </section>

        {/* GALLERY Tab/Button */}
        <section className="flex flex-col items-center mb-16">
          <button
            onClick={() => setIsGalleryOpen(!isGalleryOpen)}
            className="relative group px-12 py-4 rounded-xl font-extrabold text-2xl md:text-3xl text-white tracking-widest overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer inline-flex items-center justify-center min-w-70 md:min-w-[320px] shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            style={gradientButtonStyle}
          >
            GALLERY
          </button>

          {/* Gallery Grid Content */}
          <div
            className={`w-full overflow-hidden transition-all duration-500 ease-in-out ${isGalleryOpen ? "max-h-[2000px] opacity-100 mt-10" : "max-h-0 opacity-0 pointer-events-none"}`}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
              {Object.keys(galleryData)
                .slice()
                .reverse()
                .map((year) => (
                  <div
                    key={year}
                    onClick={() => {
                      setSelectedYear(year);
                      setActiveImageIndex(null);
                    }}
                    className="group relative rounded-2xl overflow-hidden liquid-glass border border-white/10 p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,192,255,0.2)] cursor-pointer"
                  >
                    <div className="relative aspect-square rounded-xl overflow-hidden mb-4 border border-white/10 bg-neutral/50">
                      <img
                        src={
                          galleryThumbnails[
                            year as keyof typeof galleryThumbnails
                          ]
                        }
                        alt={`ABK ${year}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white bg-black/60 px-4 py-2 rounded-full text-sm font-bold border border-white/20 tracking-wider">
                          VIEW IMAGES
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-white tracking-wider uppercase group-hover:text-[#f0b405] transition-colors">
                        ABK {year.substring(2)}
                      </h3>
                      <p className="text-xs text-white/50 tracking-widest mt-1 uppercase font-semibold">
                        {galleryData[year as keyof typeof galleryData].length}{" "}
                        PHOTOS
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>

        {/* SPONSOR ABK Button */}
        <section className="flex justify-center mb-8">
          <button
            className="relative group px-12 py-5 rounded-xl font-extrabold text-2xl md:text-3xl text-white tracking-widest overflow-hidden transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] cursor-pointer inline-flex items-center justify-center min-w-70 md:min-w-[320px] shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            style={gradientButtonStyle}
          >
            SPONSOR ABK
          </button>
        </section>
      </main>

      {/* LIGHTBOX MODAL */}
      {selectedYear && (
        <div className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-lg p-4 md:p-8 animate-in fade-in duration-300">
          {/* Modal Header */}
          <div className="flex items-center justify-between w-full pb-4 border-b border-white/10 mb-6">
            <h2 className="text-2xl md:text-3xl font-black text-[#f0b405] tracking-widest uppercase">
              ABK {selectedYear.substring(2)} GALLERY
            </h2>
            <button
              onClick={() => {
                setSelectedYear(null);
                setActiveImageIndex(null);
              }}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all text-xl cursor-pointer hover:rotate-90 duration-300"
            >
              ✕
            </button>
          </div>

          {/* Modal Content */}
          <div className={`grow overflow-y-auto max-h-[75vh] px-2 ${activeImageIndex === null ? 'py-4' : 'flex items-center justify-center'}`}>
            {activeImageIndex === null ? (
              /* Grid View of all images in selected year */
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-full max-w-6xl mx-auto">
                {galleryData[selectedYear as keyof typeof galleryData].map(
                  (imgUrl, idx) => (
                    <div
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className="group relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-neutral/40 cursor-pointer hover:scale-[1.02] transition-transform duration-300"
                    >
                      <img
                        src={imgUrl}
                        alt={`ABK ${selectedYear} - Image ${idx + 1}`}
                        className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-white text-3xl font-bold">+</span>
                      </div>
                    </div>
                  ),
                )}
              </div>
            ) : (
              /* Full screen lightbox viewer */
              <div className="relative w-full h-full max-w-5xl flex items-center justify-center select-none">
                {/* Previous Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const images =
                      galleryData[selectedYear as keyof typeof galleryData];
                    setActiveImageIndex(
                      (activeImageIndex - 1 + images.length) % images.length,
                    );
                  }}
                  className="absolute left-2 md:-left-16 w-14 h-14 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white text-3xl hover:scale-110 transition-transform cursor-pointer z-10"
                >
                  ‹
                </button>

                {/* Main Image */}
                <div className="max-w-full max-h-[60vh] md:max-h-[70vh] rounded-2xl overflow-hidden shadow-2xl border border-white/10 relative">
                  <img
                    src={
                      galleryData[selectedYear as keyof typeof galleryData][
                        activeImageIndex
                      ]
                    }
                    alt={`ABK ${selectedYear} Large`}
                    className="max-h-[58vh] md:max-h-[68vh] object-contain mx-auto"
                  />
                  {/* Index Tag */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/75 text-white/95 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-widest border border-white/10">
                    {activeImageIndex + 1} /{" "}
                    {
                      galleryData[selectedYear as keyof typeof galleryData]
                        .length
                    }
                  </div>
                </div>

                {/* Next Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const images =
                      galleryData[selectedYear as keyof typeof galleryData];
                    setActiveImageIndex((activeImageIndex + 1) % images.length);
                  }}
                  className="absolute right-2 md:-right-16 w-14 h-14 rounded-full bg-black/60 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white text-3xl hover:scale-110 transition-transform cursor-pointer z-10"
                >
                  ›
                </button>
              </div>
            )}
          </div>

          {/* Modal Footer Controls */}
          <div className="flex justify-center gap-4 py-4 border-t border-white/10 mt-6 min-h-15">
            {activeImageIndex !== null && (
              <button
                onClick={() => setActiveImageIndex(null)}
                className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold tracking-wider cursor-pointer uppercase transition-colors text-sm"
              >
                Back to Grid
              </button>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
