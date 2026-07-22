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

            <div className="container mx-auto px-4 max-w-5xl">
                <div className="flex flex-col md:flex-row relative border-2 border-[#ffcc00] rounded-3xl overflow-hidden bg-black/30 backdrop-blur-sm">
                    {/* Vertical Divider for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-8 bottom-8 w-[2px] bg-[#ffcc00] -translate-x-1/2"></div>
                    {/* Horizontal Divider for Mobile */}
                    <div className="md:hidden w-full h-[2px] bg-[#ffcc00] my-4"></div>

                    {/* Left Column */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center gap-10">
                        <div className="flex flex-col items-center text-center gap-4">
                            <h3 className="text-xs md:text-sm font-bold tracking-widest uppercase">Headline Sponsor & Partner</h3>
                            <div className="h-16 md:h-24 flex items-center justify-center bg-white p-4 rounded-xl">
                                <img src="/assets/spons1.png" alt="Clere" className="max-h-full max-w-full object-contain" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center text-center gap-4">
                            <h3 className="text-xs md:text-sm font-bold tracking-widest uppercase">Beverage Sponsor & Partner</h3>
                            <div className="h-16 md:h-24 flex items-center justify-center">
                                <img src="/assets/spons2.png" alt="Malta Guinness" className="max-h-full max-w-full object-contain" />
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center gap-10">
                        <div className="flex flex-col items-center text-center gap-4">
                            <h3 className="text-xs md:text-sm font-bold tracking-widest uppercase">Supporting Partners</h3>
                            <div className="h-16 md:h-24 flex items-center justify-center">
                                <img src="/assets/spons3.jpg" alt="Supporting Partner" className="max-h-full max-w-full object-contain mix-blend-screen" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center text-center gap-4">
                            <h3 className="text-xs md:text-sm font-bold tracking-widest uppercase">Media Partners</h3>
                            <div className="h-16 md:h-24 flex items-center justify-center">
                                <img src="/assets/spons4.png" alt="Media Partner" className="max-h-full max-w-full object-contain" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
