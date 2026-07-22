import { Icon } from "@iconify/react";

interface TimelineEvent {
  date: string;
  title: string;
  icon: string;
  side: "left" | "right";
  active?: boolean;
  circleClass: string;
  iconClass: string;
  dateColorClass: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "22nd July, 2026",
    title: "Online Registration Opens",
    icon: "lucide:user-plus",
    side: "left",
    active: true,
    circleClass:
      "bg-purple-500/20 border-purple-500 shadow-lg shadow-purple-500/20 animate-pulse",
    iconClass: "text-purple-400",
    dateColorClass: "text-purple-400",
  },
  {
    date: "16th August, 2026",
    title: "Auditions",
    icon: "lucide:flame",
    side: "right",
    circleClass:
      "bg-black/60 border-white/20 group-hover:bg-pink-500/10 group-hover:border-pink-500",
    iconClass: "text-white/60 group-hover:text-pink-400",
    dateColorClass: "text-pink-400",
  },
  {
    date: "19th - 21st August, 2026",
    title: "Qualifiers Bootcamp",
    icon: "lucide:tv",
    side: "left",
    circleClass:
      "bg-black/60 border-white/20 group-hover:bg-orange-500/10 group-hover:border-orange-500",
    iconClass: "text-white/60 group-hover:text-orange-400",
    dateColorClass: "text-orange-400",
  },
  {
    date: "25th September, 2026",
    title: "Main Event",
    icon: "lucide:trophy",
    side: "right",
    circleClass:
      "bg-black/60 border-white/20 group-hover:bg-green-500/10 group-hover:border-green-500",
    iconClass: "text-white/60 group-hover:text-green-400",
    dateColorClass: "text-green-400",
  },
];

export default function TimelineSection() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-24 relative z-10 overflow-hidden">
      <div className="absolute -top-8 left-4 md:left-10 z-0 opacity-40 pointer-events-none hidden md:block">
        <img
          src="/Crown.webp"
          alt=""
          aria-hidden="true"
          className="w-16 md:w-24 drop-shadow-xl animate-float-slow"
        />
      </div>
      <div className="absolute top-1/3 right-2 md:right-10 z-0 opacity-35 pointer-events-none hidden md:block">
        <img
          src="/Star.webp"
          alt=""
          aria-hidden="true"
          className="w-12 md:w-16 drop-shadow-xl animate-float-slow"
        />
      </div>
      <div className="absolute bottom-10 left-6 md:left-16 z-0 opacity-30 pointer-events-none hidden lg:block">
        <img
          src="/Music.webp"
          alt=""
          aria-hidden="true"
          className="w-14 md:w-20 drop-shadow-xl animate-float-slower"
        />
      </div>

      <div className="max-w-6xl mx-auto text-center flex flex-col gap-2 relative z-10">
        <h2 className="text-2xl md:text-4xl font-black text-white uppercase">
          TIMELINE OF ABK 26
        </h2>

        {/* Timeline Tree Wrapper */}
        <div className="relative mt-12 md:mt-24 px-0 md:px-6">
          {/* Chromatic vertical line rising from green at bottom to purple at top */}
          <div
            className="absolute left-6 md:left-1/2 top-4 bottom-4 transform -translate-x-1/2 w-1 rounded-full"
            style={{
              background:
                "linear-gradient(to top, #22c55e 0%, #06b6d4 25%, #f97316 50%, #ec4899 75%, #a855f7 100%)",
            }}
          ></div>

          {/* Timeline items */}
          <div className="flex flex-col gap-10 md:gap-14 relative">
            {timelineEvents.map((event, index) => {
              const isLeft = event.side === "left";
              return (
                <div
                  key={index}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-start md:items-center group"
                >
                  {/* Central Indicator Dot */}
                  <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center">
                    <div
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 shadow-2xl transition-all duration-500 group-hover:scale-110 ${event.circleClass}`}
                    >
                      <Icon
                        icon={event.icon}
                        className={`w-5 h-5 transition-colors duration-300 ${event.iconClass}`}
                      />
                    </div>
                  </div>

                  {/* Left Container */}
                  <div className="hidden md:flex w-full pl-0 md:pr-8 md:text-right justify-end">
                    {isLeft && (
                      <div
                        className={`liquid-glass border border-white/10 rounded-2xl p-6 md:p-7 transition-all duration-300 transform hover:-translate-y-1 md:ml-auto max-w-md w-full text-left bg-black/50 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)] ${
                          index === 0 ? "border-purple-500/30" : ""
                        }`}
                      >
                        <span
                          className={`text-xs md:text-sm font-bold  block mb-2 ${event.dateColorClass}`}
                        >
                          {event.date}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                          {event.title}
                        </h3>
                      </div>
                    )}
                  </div>

                  {/* Central Spacer */}
                  <div className="hidden md:flex w-10 md:w-14 items-center justify-center" />

                  {/* Right Container */}
                  <div className="w-full pl-16 pr-4 md:pl-8 md:pr-0 md:text-left flex justify-start">
                    <div className="md:hidden w-full max-w-md ml-auto text-left">
                      <div
                        className={`liquid-glass border border-white/10 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 w-full bg-black/50 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)] ${
                          isLeft && index === 0 ? "border-purple-500/30" : ""
                        } ${!isLeft && index === timelineEvents.length - 1 ? "border-green-500/30" : ""}`}
                      >
                        <span
                          className={`text-xs font-bold block mb-2 ${event.dateColorClass}`}
                        >
                          {event.date}
                        </span>
                        <h3 className="text-lg font-bold text-white mb-2">
                          {event.title}
                        </h3>
                      </div>
                    </div>
                    {!isLeft && (
                      <div
                        className={`liquid-glass border border-white/10 rounded-2xl p-6 md:p-7 transition-all duration-300 transform hover:-translate-y-1 md:mr-auto max-w-md w-full text-left bg-black/50 backdrop-blur-xl shadow-[0_12px_40px_rgba(0,0,0,0.35)] ${
                          index === timelineEvents.length - 1
                            ? "border-green-500/30"
                            : ""
                        } hidden md:block`}
                      >
                        <span
                          className={`text-xs md:text-sm font-bold block mb-2 ${event.dateColorClass}`}
                        >
                          {event.date}
                        </span>
                        <h3 className="text-lg md:text-xl font-bold text-white mb-2">
                          {event.title}
                        </h3>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
