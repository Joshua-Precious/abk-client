interface TimelineEvent {
  date: string;
  title: string;
  accent: string;
  accentClass: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    date: "22nd July, 2026",
    title: "Registration Opens",
    accent: "22ND JULY",
    accentClass: "text-red-500",
  },
  {
    date: "16th August, 2026",
    title: "Auditions",
    accent: "16TH AUG",
    accentClass: "text-amber-500",
  },
  {
    date: "19th - 21st August, 2026",
    title: "Qualifiers Bootcamp",
    accent: "19TH - 21ST AUG",
    accentClass: "text-yellow-400",
  },
  {
    date: "25th September, 2026",
    title: "Main Event",
    accent: "25TH SEP",
    accentClass: "text-green-500",
  },
];

export default function TimelineSection() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-24 relative z-10">
      <div className="max-w-6xl mx-auto text-center flex flex-col gap-8">
        <h2 className="text-2xl md:text-4xl font-black text-white uppercase tracking-wide">
          TIMELINE OF ABK 26
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-4">
          {timelineEvents.map((event) => (
            <div key={event.date} className="group ">
              <div className="flex min-h-32 md:min-h-36 flex-col items-center justify-center gap-2 md:gap-3 text-center leading-none">
                <span
                  className={`font-black uppercase tracking-tight ${event.accentClass} text-md md:text-xl`}
                >
                  {event.accent}
                </span>
                <span
                  className={`mx-auto max-w-[12ch] font-black uppercase tracking-[0.08em] ${event.accentClass} text-xl md:text-2xl`}
                >
                  {event.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
