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
  {
    name: "Callprint",
    logoUrl: "/assets/sponsors/Callprint.webp",
    initials: "CP",
  },
];

// Single Partner Logo Item (No cards, larger images, high-visibility typography, graceful fallback)
function PartnerLogoItem({
  partner,
  size = "md",
}: {
  partner: SponsorItem;
  size?: "lg" | "md" | "sm";
}) {
  const [hasError, setHasError] = useState(false);

  const sizeClasses = {
    lg: "h-36 sm:h-44 md:h-56 max-w-[280px] sm:max-w-[340px] md:max-w-[400px]",
    md: "h-24 sm:h-32 md:h-40 max-w-[200px] sm:max-w-[260px] md:max-w-[300px]",
    sm: "h-18 sm:h-24 md:h-32 max-w-[160px] sm:max-w-[200px] md:max-w-[240px]",
  }[size];

  return (
    <div className="group flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 p-2 w-full">
      {/* Logo container without cards */}
      <div className={`flex items-center justify-center w-full ${sizeClasses}`}>
        {!hasError ? (
          <img
            src={partner.logoUrl}
            alt={partner.name}
            onError={() => setHasError(true)}
            className="max-h-full max-w-full object-contain filter drop-shadow-[0_6px_20px_rgba(0,0,0,0.7)] group-hover:drop-shadow-[0_10px_30px_rgba(255,204,0,0.35)] transition-all duration-300"
            loading="lazy"
          />
        ) : (
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-linear-to-br from-[#ffcc00]/20 to-orange-500/20 border-2 border-[#ffcc00]/50 flex items-center justify-center text-[#ffcc00] font-black tracking-widest text-base sm:text-lg md:text-xl shadow-[0_0_25px_rgba(255,204,0,0.2)]">
            {partner.initials}
          </div>
        )}
      </div>

      {/* Brand Name Label - High Visibility */}
      <h4
        className={`font-black text-white tracking-wider uppercase group-hover:text-[#ffcc00] transition-colors leading-tight drop-shadow-md ${
          size === "lg"
            ? "mt-4 text-base sm:text-lg md:text-xl"
            : size === "md"
              ? "mt-3.5 text-sm sm:text-base md:text-lg"
              : "mt-3 text-xs sm:text-sm md:text-base"
        }`}
      >
        {partner.name}
      </h4>
      {partner.role && (
        <p className="text-xs sm:text-sm font-bold text-[#ffcc00] tracking-wider uppercase mt-1 drop-shadow-sm">
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

          {/* Large Title Sponsor Logo Showcase (No Card, Clean Shadow) */}
          <div className="flex flex-col items-center justify-center group mb-4">
            <div className="h-44 sm:h-60 md:h-72 lg:h-80 w-auto max-w-[90vw] md:max-w-2xl flex items-center justify-center p-2">
              {!poweredByError ? (
                <img
                  src={POWERED_BY_SPONSOR.logoUrl}
                  alt={POWERED_BY_SPONSOR.name}
                  onError={() => setPoweredByError(true)}
                  className="max-h-full max-w-full object-contain filter drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              ) : (
                <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-3xl bg-linear-to-br from-[#ffcc00] to-orange-500 text-black flex items-center justify-center font-black text-3xl sm:text-4xl shadow-lg">
                  {POWERED_BY_SPONSOR.initials}
                </div>
              )}
            </div>

            {/* Title Text */}
            <h3 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-wider uppercase drop-shadow-lg mt-4">
              {POWERED_BY_SPONSOR.name}
            </h3>
            <p className="text-base sm:text-lg md:text-xl font-bold text-[#ffcc00] tracking-widest uppercase mt-1 drop-shadow">
              {POWERED_BY_SPONSOR.role}
            </p>
          </div>
        </div>

        {/* ========================================================= */}
        {/* TIER 2: SUPPORTING PARTNERS (No Cards, Larger Logos)      */}
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
              <PartnerLogoItem key={partner.name} partner={partner} size="md" />
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* TIER 3: MEDIA PARTNERS (No Cards, Larger Logos)           */}
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
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-10 md:gap-12 items-center justify-items-center w-full max-w-6xl">
            {MEDIA_PARTNERS.map((partner) => (
              <PartnerLogoItem key={partner.name} partner={partner} size="sm" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
