import React from "react";

export default function EventBannerSection() {
    return (
        <section className="w-full flex flex-col md:flex-row shadow-2xl relative z-10 overflow-hidden">
            {/* Left side - Orange */}
            <div className="w-full md:w-1/2 bg-[#d97736] py-10 md:py-16 px-6 flex items-center justify-center relative overflow-hidden">
                {/* Subtle grunge overlay for texture */}
                <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('/grunge.jpg')] bg-cover bg-center"></div>
                <div className="relative z-10 text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-md">
                        ACCRA'S BIGGEST<br />
                        DANCE EVENT
                    </h2>
                </div>
            </div>

            {/* Right side - Red */}
            <div className="w-full md:w-1/2 bg-[#db3b3b] py-10 md:py-16 px-6 flex items-center justify-center relative overflow-hidden">
                {/* Subtle grunge overlay for texture */}
                <div className="absolute inset-0 opacity-10 mix-blend-multiply bg-[url('/grunge.jpg')] bg-cover bg-center"></div>
                <div className="relative z-10 text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-md">
                        1 CROWN<br />
                        1 BIG STAGE<br />
                        3 ROUNDS
                    </h2>
                </div>
            </div>
        </section>
    );
}
