export default function PartnersSection() {
    return (
        <section className="py-8 md:py-24 gap-4 relative">
            {/* Floating Star Icon */}
            <img 
                src="/Star.webp" 
                alt="Star" 
                className="absolute -right-2 md:-right-8 -top-10 md:top-12 w-24 md:w-48 z-20 pointer-events-none drop-shadow-xl"
            />
            
            <h2 className="text-3xl md:text-5xl flex items-center justify-center font-black tracking-widest text-white mb-12 drop-shadow-sm uppercase">
                BRANDS & PARTNERS
            </h2>

            <div className="container mx-auto px-4 max-w-5xl flex flex-col gap-8">

                {/* Supporting Partners */}
                <div className="border-2 border-[#ffcc00] rounded-3xl overflow-hidden bg-black/30 backdrop-blur-sm">
                    {/* Category Header */}
                    <div className="border-b-2 border-[#ffcc00] px-8 py-4 flex items-center justify-center">
                        <span className="text-[#ffcc00] text-xs md:text-sm font-black tracking-[0.3em] uppercase">
                            ✦ Supporting Partners ✦
                        </span>
                    </div>

                    {/* Two logos side by side */}
                    <div className="flex flex-col md:flex-row relative">
                        {/* Vertical Divider (desktop) */}
                        <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[2px] bg-[#ffcc00]/40 -translate-x-1/2" />
                        {/* Horizontal Divider (mobile) */}
                        <div className="md:hidden w-full h-[2px] bg-[#ffcc00]/40" />

                        <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
                            <div className="h-20 md:h-28 flex items-center justify-center bg-white p-4 rounded-xl">
                                <img src="/assets/spons1.png" alt="Supporting Partner 1" className="max-h-full max-w-[180px] object-contain" />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
                            <div className="h-20 md:h-28 flex items-center justify-center">
                                <img src="/assets/spons2.png" alt="Supporting Partner 2" className="max-h-full max-w-[180px] object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Media Partners */}
                <div className="border-2 border-[#ffcc00] rounded-3xl overflow-hidden bg-black/30 backdrop-blur-sm">
                    {/* Category Header */}
                    <div className="border-b-2 border-[#ffcc00] px-8 py-4 flex items-center justify-center">
                        <span className="text-[#ffcc00] text-xs md:text-sm font-black tracking-[0.3em] uppercase">
                            ✦ Media Partners ✦
                        </span>
                    </div>

                    {/* Two logos side by side */}
                    <div className="flex flex-col md:flex-row relative">
                        {/* Vertical Divider (desktop) */}
                        <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[2px] bg-[#ffcc00]/40 -translate-x-1/2" />
                        {/* Horizontal Divider (mobile) */}
                        <div className="md:hidden w-full h-[2px] bg-[#ffcc00]/40" />

                        <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
                            <div className="h-20 md:h-28 flex items-center justify-center">
                                <img src="/assets/spons3.png" alt="Media Partner 1" className="max-h-full max-w-[180px] object-contain mix-blend-screen" />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 p-8 md:p-12 flex items-center justify-center">
                            <div className="h-20 md:h-28 flex items-center justify-center">
                                <img src="/assets/spons4.jpeg" alt="Media Partner 2" className="max-h-full max-w-[180px] object-contain" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
