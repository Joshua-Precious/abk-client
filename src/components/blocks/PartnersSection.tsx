import { useState } from "react";

// ==========================================
// SPONSORS & PARTNERS CONFIGURATION
// Local assets from public/assets/sponsors/
// ==========================================

interface SponsorItem {
  name: string;
  role?: string;
  logoUrl: string;
  initials: string;
}

const POWERED_BY_SPONSOR: SponsorItem = {
  name: "Malta Guinness",
  role: "Title Beverage Sponsor",
  logoUrl: "/assets/sponsors/malta.webp",
  initials: "MG",
};

const SUPPORTING_PARTNERS: SponsorItem[] = [
  {
    name: "Shower to Shower",
    logoUrl: "/assets/sponsors/showertoshower.webp",
    initials: "STS",
  },
  {
    name: "Peeva Water",
    logoUrl: "/assets/sponsors/peevaWater.webp",
    initials: "PW",
  },
  {
    name: "Capitol catering",
    logoUrl: "/assets/sponsors/capitol.webp",
    initials: "CC",
  },
  {
    name: "PrintOnce Graphics",
    logoUrl: "/assets/sponsors/printOnce.webp",
    initials: "PO",
  },
  {
    name: "HI5 catering service",
    logoUrl: "/assets/sponsors/H15.webp",
    initials: "HI5",
  },
  {
    name: "Urban Phones",
    logoUrl: "/assets/sponsors/urban.webp",
    initials: "UP",
  },
];

const MEDIA_PARTNERS: SponsorItem[] = [
  {
    name: "KRISTOCENTRIC",
    logoUrl: "/assets/sponsors/kristoCentric.webp",
    initials: "KC",
  },
  {
    name: "Sweet Melodies",
    logoUrl: "/assets/spons4.jpeg",
    initials: "SM",
  },
  {
    name: "Majik Studios",
    logoUrl: "/assets/spons3.png",
    initials: "MS",
  },
  {
    name: "Sunny TV",
    logoUrl: "/assets/sponsors/sunnyTv.webp",
    initials: "STV",
  },
  {
    name: "Sunny FM",
    logoUrl: "/assets/sponsors/sunnyFm.webp",
    initials: "SFM",
  },
  {
    name: "TV XYZ",
    logoUrl: "/assets/sponsors/tvXYZ.webp",
    initials: "XYZ",
  },
];

// Single Partner Logo Item (Uniform dimensions for all logos, clean alignment, graceful fallback)
function PartnerLogoItem({ partner }: { partner: SponsorItem }) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="group flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 p-2 w-full">
      {/* Uniform Bounding Box for consistent dimensions across all logos */}
      <div className="w-40 sm:w-48 md:w-56 h-20 sm:h-24 md:h-28 flex items-center justify-center">
        {!hasError ? (
          <img
            src={partner.logoUrl}
            alt={partner.name}
            onError={() => setHasError(true)}
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] group-hover:drop-shadow-[0_8px_24px_rgba(255,204,0,0.3)] transition-all duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-br from-[#ffcc00]/20 to-orange-500/20 border-2 border-[#ffcc00]/50 flex items-center justify-center text-[#ffcc00] font-black tracking-widest text-base sm:text-lg shadow-[0_0_25px_rgba(255,204,0,0.2)]">
            {partner.initials}
          </div>
        )}
      </div>

      {/* Brand Name Label - Uniform positioning & readable typography */}
      <h4 className="mt-3 text-xs sm:text-sm md:text-base font-black text-white tracking-wider uppercase group-hover:text-[#ffcc00] transition-colors leading-tight drop-shadow-md">
        {partner.name}
      </h4>
      {partner.role && (
        <p className="text-xs font-bold text-[#ffcc00] tracking-wider uppercase mt-1 drop-shadow-sm">
          {partner.role}
        </p>
      )}
    </div>
  );
}

export default function PartnersSection() {
  const [poweredByError, setPoweredByError] = useState(false);

  return (
    <section className="py-12 md:py-24 gap-4 relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <img
        src="/Crown.webp"
        alt="Crown"
        className="absolute -left-4 md:left-8 top-6 md:top-14 w-20 md:w-36 z-20 pointer-events-none drop-shadow-2xl -rotate-12"
      />
      <img
        src="/Star.webp"
        alt="Star"
        className="absolute -right-4 md:right-8 top-12 md:top-20 w-24 md:w-44 z-20 pointer-events-none drop-shadow-xl rotate-12"
      />

      {/* Section Header */}
      <div className="flex flex-col gap-2 container mx-auto px-4 max-w-5xl text-center mb-12 md:mb-20">
        <span className="inline-block text-[#ffcc00] text-xs md:text-sm font-black tracking-[0.35em] uppercase mb-2">
          ✦ Official Sponsors & Partners ✦
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-widest text-white drop-shadow-md uppercase">
          BRANDS & PARTNERS
        </h2>
        <p className="text-white/60 text-xs md:text-sm max-w-lg mx-auto mt-2 font-medium tracking-wide">
          Powering the biggest dance battle of the year in Accra
        </p>
      </div>

      <div className="container mx-auto px-4 max-w-6xl flex flex-col gap-16 md:gap-24">
        {/* ========================================================= */}
        {/* TIER 1: ABK POWERED BY (Title Beverage Sponsor)           */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center text-center">
          {/* Category Divider Header */}
          <div className="flex items-center justify-center gap-4 w-full max-w-4xl mb-6 md:mb-10">
            <div className="h-0.5 grow bg-linear-to-r from-transparent to-[#ffcc00]/80" />
            <span className="text-[#ffcc00] text-sm sm:text-base md:text-lg font-black tracking-[0.3em] uppercase text-center shrink-0 px-2">
              ✦ ABK Powered By ✦
            </span>
            <div className="h-0.5 grow bg-linear-to-l from-transparent to-[#ffcc00]/80" />
          </div>

          {/* Title Sponsor Logo Showcase (Moderated, balanced sizing) */}
          <div className="flex flex-col bg-white py-3 sm:py-4 px-8 sm:px-16 md:px-20 rounded-2xl items-center justify-center group mb-4 shadow-md">
            <div className="h-28 sm:h-36 md:h-44 w-auto max-w-[85vw] md:max-w-lg flex items-center justify-center p-1">
              {!poweredByError ? (
                <img
                  src={POWERED_BY_SPONSOR.logoUrl}
                  alt={POWERED_BY_SPONSOR.name}
                  onError={() => setPoweredByError(true)}
                  className="max-h-full max-w-full object-contain filter group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-linear-to-br from-[#ffcc00] to-orange-500 text-black flex items-center justify-center font-black text-2xl sm:text-3xl shadow-lg">
                  {POWERED_BY_SPONSOR.initials}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TIER 2: SUPPORTING PARTNERS (Uniform Logo Dimensions)     */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center">
          {/* Category Divider Header */}
          <div className="flex items-center justify-center gap-4 w-full max-w-4xl mb-8 md:mb-12">
            <div className="h-0.5 grow bg-linear-to-r from-transparent to-[#ffcc00]/80" />
            <span className="text-[#ffcc00] text-sm sm:text-base md:text-lg font-black tracking-[0.3em] uppercase text-center shrink-0 px-2">
              ✦ Supporting Partners ✦
            </span>
            <div className="h-0.5 grow bg-linear-to-l from-transparent to-[#ffcc00]/80" />
          </div>

          {/* 6 Supporting Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 items-center justify-items-center w-full max-w-5xl">
            {SUPPORTING_PARTNERS.map((partner) => (
              <PartnerLogoItem key={partner.name} partner={partner} />
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* TIER 3: MEDIA PARTNERS (Uniform Logo Dimensions)          */}
        {/* ========================================================= */}
        <div className="flex flex-col items-center">
          {/* Category Divider Header */}
          <div className="flex items-center justify-center gap-4 w-full max-w-4xl mb-8 md:mb-12">
            <div className="h-0.5 grow bg-linear-to-r from-transparent to-[#ffcc00]/80" />
            <span className="text-[#ffcc00] text-sm sm:text-base md:text-lg font-black tracking-[0.3em] uppercase text-center shrink-0 px-2">
              ✦ Media Partners ✦
            </span>
            <div className="h-0.5 grow bg-linear-to-l from-transparent to-[#ffcc00]/80" />
          </div>

          {/* Media Partners Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 md:gap-16 items-center justify-items-center w-full max-w-5xl">
            {MEDIA_PARTNERS.map((partner) => (
              <PartnerLogoItem key={partner.name} partner={partner} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
