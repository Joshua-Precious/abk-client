

export default function PartnersSection() {
    const sponsors = [
        "/assets/spons1.png",
        "/assets/spons2.png",
        "/assets/spons3.jpg",
        "/assets/spons4.png"
    ];

    return (
        <section className="py-8 md:py-16 gap-4">
            <h2 className="text-2xl md:text-3xl flex items-center justify-center font-black tracking-[0.2em] text-white">
                Previous Sponsors
            </h2>

            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 bg-black/40 p-6 md:p-10 ">
                {sponsors.map((spons, i) => (
                    <div
                        key={i}
                        className="h-20 w-32 md:h-28 md:w-40 flex items-center justify-center p-2"
                    >
                        <img
                            src={spons}
                            alt={`Sponsor ${i + 1}`}
                            className="max-h-full max-w-full object-contain filter hover:grayscale-0 hover:opacity-100 transition-all duration-500 hover:scale-110"
                        />
                    </div>
                ))}

            </div>
        </section>
    );
}
