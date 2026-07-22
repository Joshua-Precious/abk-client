import Header from "../components/blocks/Header";
import Footer from "../components/blocks/Footer";

const vendorCategories = [
  {
    id: 1,
    title: "Food & Grill",
    desc: "Gourmet street food, local delicacies, and quick bites.",
  },
  {
    id: 2,
    title: "Beverages & Cocktails",
    desc: "Refreshing drinks, signature cocktails, and craft beverages.",
  },
  {
    id: 3,
    title: "Fashion & Apparel",
    desc: "Streetwear brands, urban apparel, and custom fashion items.",
  },
];

const gradientButtonStyle = {
  background:
    "linear-gradient(#05070a, #05070a) padding-box, linear-gradient(90deg, #ff3b00, #ff1f5b, #7a2cff, #00f0ff) border-box",
  border: "3px solid transparent",
};

export default function Vendors() {
  return (
    <div className="flex flex-col min-h-screen text-neutral-content">
      <Header />

      <main className="pt-28 md:pt-36 grow relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 pb-20">
          {/* Title Block */}
          <div className="text-center mb-6 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-bold text-[#f0b405] tracking-wider uppercase mb-4">
              VENDORS
            </h1>
            <p className="text-white/80 text-lg md:text-2xl font-semibold uppercase tracking-widest max-w-2xl mx-auto leading-relaxed">
              Be the royal concierge for ABK. Register for a vendor slot.
            </p>
            <div className="w-24 h-1 bg-[#f0b405] mx-auto mt-6 rounded-full" />
          </div>

          {/* Registration Details Banner */}
          <div className="flex justify-center mb-16 animate-fade-in">
            <div
              className="px-8 py-4 rounded-xl inline-flex items-center gap-3"
              style={gradientButtonStyle}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-[#f0b405] animate-pulse inline-block" />
              <span className="text-white font-black text-sm md:text-base tracking-[0.3em] uppercase">
                Registration Details — Coming Soon
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#f0b405] animate-pulse inline-block" />
            </div>
          </div>

          {/* Vendor Category Placeholder Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {vendorCategories.map((category) => (
              <div
                key={category.id}
                className="group relative liquid-glass rounded-2xl border border-white/10 p-6 md:p-8 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(240,180,5,0.15)] cursor-pointer"
              >
                {/* Background Watermark */}
                <img
                  src="/Crown.webp"
                  alt=""
                  aria-hidden="true"
                  className="absolute -right-4 -bottom-4 w-36 opacity-[0.05] pointer-events-none select-none"
                />

                <div className="flex items-center justify-between mb-4 relative z-10">
                  <span className="text-[10px] font-black tracking-[0.25em] uppercase text-[#f0b405]">
                    SLOT 0{category.id}
                  </span>
                  <span className="text-[10px] font-black text-white/40 tracking-widest uppercase bg-white/5 px-2.5 py-1 rounded-md border border-white/10">
                    COMING SOON
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 tracking-wide group-hover:text-[#f0b405] transition-colors duration-300 relative z-10 uppercase">
                  {category.title}
                </h3>
                <p className="text-xs md:text-sm text-white/60 leading-relaxed relative z-10">
                  {category.desc}
                </p>

                {/* Bottom gradient border line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-[#f0b405]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* Notify / Pre-register Interest CTA */}
          <div className="flex flex-col items-center mt-20 gap-6 animate-fade-in">
            <p className="text-white/50 text-sm md:text-base font-semibold tracking-widest uppercase text-center">
              Want to showcase your brand at Accra's Boogie King?
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
