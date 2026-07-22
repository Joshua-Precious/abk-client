import { useNavigate } from "react-router";

export default function ActionButtonsSection() {
  const navigate = useNavigate();

  const buttons = [
    {
      label: "MERCH",
      sublabel: "OF THE ROYALS",
      action: () => navigate("/merch"),
      bgClass: "bg-[#ff9900]",
    },
    {
      label: "REGISTER",
      sublabel: "YOUR TEAM",
      action: () => navigate("/register"),
      bgClass: "bg-[#ff0000]",
      extraClass: "md:scale-110 z-10 shadow-2xl", // Make it slightly larger as in design
    },
    {
      label: "RULES",
      sublabel: "OF THE COMPETITION",
      action: () => {},
      bgClass: "bg-[#e65c00]",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-8 md:py-16 relative">
      {/* Floating Art Icon */}
      <img
        src="/Art.webp"
        alt="Art"
        className="absolute -left-4 md:-left-12 bottom-0 w-24 md:w-48 z-20 pointer-events-none drop-shadow-xl hidden md:block"
      />
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-center">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.action}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-white/20 ${btn.bgClass} ${btn.extraClass || ""}`}
            >
              {/* Subtle inner shadow/highlight for depth */}
              <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent opacity-50 mix-blend-overlay"></div>
              <div className="p-6 md:p-8 hover:cursor-pointer flex flex-col items-center justify-center h-full relative z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
                <h3 className="text-3xl md:text-5xl font-black tracking-wider text-white drop-shadow-md leading-none">
                  {btn.label}
                </h3>
                <p className="text-xs md:text-sm font-bold tracking-widest text-white mt-1 drop-shadow-sm uppercase">
                  {btn.sublabel}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
