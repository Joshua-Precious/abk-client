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
      extraClass: "scale-105 md:scale-110 my-2 md:my-0",
    },
    {
      label: "RULES",
      sublabel: "OF THE COMPETITION",
      action: () => {},
      bgClass: "bg-[#e65c00]",
    },
  ];

  return (
    <section className="container mx-auto px-4 py-10 md:py-16 relative">
      {/* Floating Art Icon */}
      <img
        src="/assets/mascot.png"
        alt="Mascot"
        className="absolute -left-2 md:-left-12 bottom-0 w-32 md:w-62 z-20 pointer-events-none drop-shadow-xl"
      />
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 items-center">
          {buttons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.action}
              className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-white/20 flex flex-col items-center justify-center cursor-pointer ${btn.bgClass} ${btn.extraClass || ""}`}
            >
              {/* Subtle inner shadow/highlight for depth */}
              <div className="absolute inset-0 bg-linear-to-b from-white/20 to-transparent opacity-50 mix-blend-overlay pointer-events-none"></div>
              <div
                className={`flex flex-col items-center justify-center text-center w-full relative z-10 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] ${btn.label === "REGISTER" ? "py-8 px-6 md:py-10 md:px-8" : "py-6 px-6"}`}
              >
                <h3
                  className={`font-black tracking-wider text-white drop-shadow-md leading-none ${btn.label === "REGISTER" ? "text-3xl sm:text-4xl lg:text-5xl tracking-[0.06em]" : "text-2xl sm:text-3xl lg:text-4xl"}`}
                >
                  {btn.label}
                </h3>
                <p
                  className={`font-bold tracking-widest text-white mt-1 drop-shadow-sm uppercase ${btn.label === "REGISTER" ? "text-xs sm:text-sm lg:text-base md:mt-2" : "text-[10px] sm:text-xs lg:text-sm"}`}
                >
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
