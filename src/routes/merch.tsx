import Header from "../components/blocks/Header";
import Footer from "../components/blocks/Footer";

const placeholderItems = [
  { id: 1, name: "ABK Classic Tee", category: "T-Shirts" },
  { id: 2, name: "Champion Hoodie", category: "Hoodies" },
  { id: 3, name: "Royals Cap", category: "Headwear" },
  { id: 4, name: "ABK Track Jacket", category: "Jackets" },
];

const gradientButtonStyle = {
  background:
    "linear-gradient(#05070a, #05070a) padding-box, linear-gradient(90deg, #ff3b00, #ff1f5b, #7a2cff, #00f0ff) border-box",
  border: "3px solid transparent",
};

export default function Merch() {
  return (
    <div className="flex flex-col min-h-screen text-neutral-content">
      <Header />

      <main className="pt-28 md:pt-36 grow relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pb-20">
          {/* Title Block */}
          <div className="text-center mb-6 section-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold text-[#f0b405] tracking-wider uppercase mb-4">
              MERCH
            </h1>
            <p className="text-white/80 text-lg md:text-2xl font-semibold uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
              Wear the raiments of the royals and champions
            </p>
            <div className="w-24 h-1 bg-[#f0b405] mx-auto mt-6 rounded-full" />
          </div>

          {/* Coming Soon Banner */}
          <div className="flex justify-center mb-16 section-fade-in">
            <div
              className="px-8 py-4 rounded-xl inline-flex items-center gap-3"
              style={gradientButtonStyle}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#f0b405] animate-pulse inline-block" />
              <span className="text-white font-black text-sm md:text-base tracking-wide uppercase">
                Collection Dropping Soon
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#f0b405] animate-pulse inline-block" />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
            {placeholderItems.map((item) => (
              <div
                key={item.id}
                className="group relative liquid-glass rounded-2xl border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(240,180,5,0.15)] cursor-pointer"
              >
                {/* Placeholder Image Area */}
                <div className="relative aspect-square bg-linear-to-br from-white/5 to-black/30 flex flex-col items-center justify-center overflow-hidden">
                  {/* Subtle background crown watermark */}
                  <img
                    src="/Crown.webp"
                    alt=""
                    aria-hidden="true"
                    className="absolute w-3/4 opacity-[0.06] pointer-events-none select-none"
                  />
                  {/* Coming Soon overlay */}
                  <div className="flex flex-col items-center gap-2 relative z-10">
                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border-2 border-white/15 bg-white/5 flex items-center justify-center">
                      <img
                        src="/Crown.webp"
                        alt=""
                        aria-hidden="true"
                        className="w-8 h-8 object-contain opacity-70 drop-shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                      />
                    </div>
                    <span className="text-white/30 text-[10px] md:text-xs font-black tracking-[0.25em] uppercase">
                      Coming Soon
                    </span>
                  </div>

                  {/* Hover shimmer effect */}
                  <div className="absolute inset-0 bg-linear-to-tr from-[#f0b405]/0 via-[#f0b405]/5 to-[#f0b405]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* Card Info */}
                <div className="p-4">
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#f0b405]/70">
                    {item.category}
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-white mt-1 tracking-wide group-hover:text-[#f0b405] transition-colors duration-300">
                    {item.name}
                  </h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-white/30 text-xs font-semibold tracking-widest">
                      — —
                    </span>
                    <span className="text-[10px] font-black text-white/25 tracking-widest uppercase bg-white/5 px-2 py-1 rounded-md border border-white/10">
                      TBA
                    </span>
                  </div>
                </div>

                {/* Bottom gradient line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#f0b405]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
