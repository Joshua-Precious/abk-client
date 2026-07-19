import React, { useState } from "react";
import Header from "../components/blocks/Header";
import HeroSection from "../components/blocks/HeroSection";
import PartnersSection from "../components/blocks/PartnersSection";
import SocialMediaFooter from "../components/blocks/Footer";
import GlassyContainer from "../components/ui/GlassyContainer";
import GlassyCard from "../components/ui/GlassyCard";

const image2 = "/assets/teaser.png";
const flier = "/assets/monogram.webp";

export default function Gallery() {
    const [activeTab, setActiveTab] = useState("Past Events");
    const tabs = ['Past Events', 'Videos', 'Highlights', 'Behind the Scenes'];

    return (
        <div className="flex flex-col min-h-screen text-neutral-content">
            <Header />

            <main className="pt-20 md:pt-24 flex-grow relative">
                {/* Background glow */}
                <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

                <HeroSection />

                <div className="relative z-10 space-y-12 pb-12">

                    {/* Gallery Section */}
                    <div id="gallery-section" className="text-center pt-8">
                        <h1 className="font-bold text-4xl md:text-5xl text-white drop-shadow-lg tracking-wider">GALLERY</h1>
                    </div>

                    {/* Gallery Tabs */}
                    <GlassyContainer>
                        <GlassyCard className="max-w-6xl mx-auto p-6 md:p-10">
                            <div className="flex flex-wrap gap-2 mb-10 bg-black/40 rounded-xl p-2 backdrop-blur-md border border-white/5">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`flex-1 py-3 px-4 rounded-lg transition-all duration-300 font-semibold text-sm md:text-base ${activeTab === tab
                                            ? 'btn-glass'
                                            : 'text-white/60 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>

                            <div className="text-white/90 min-h-[400px]">
                                {activeTab === 'Past Events' && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Past Events Gallery</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                            {[
                                                { src: image2, title: "ABK 2023 Finals", desc: "The epic finale of Accra Boogie King 2023" },
                                                { src: flier, title: "ABK 2023 Auditions", desc: "Teams battling for their spot in the competition" }
                                            ].map((item, i) => (
                                                <div key={i} className="group bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                                                    <div className="h-56 overflow-hidden">
                                                        <img src={item.src} alt={item.title} className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110" />
                                                    </div>
                                                    <div className="p-6">
                                                        <h3 className="font-semibold text-lg text-white mb-2">{item.title}</h3>
                                                        <p className="text-sm text-white/60">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="group bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300">
                                                <div className="w-full h-56 bg-white/5 flex items-center justify-center">
                                                    <span className="text-white/40 font-medium">More photos coming soon...</span>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="font-semibold text-lg text-white mb-2">ABK 2024 Prep</h3>
                                                    <p className="text-sm text-white/60">Behind the scenes preparation</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Videos' && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Video Gallery</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            {[
                                                { title: "ABK 2023 Highlights", desc: "Best moments from the 2023 competition" },
                                                { title: "ABK 2023 Finals", desc: "Full coverage of the championship round" }
                                            ].map((item, i) => (
                                                <div key={i} className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300">
                                                    <div className="w-full h-64 bg-white/5 flex items-center justify-center relative group cursor-pointer">
                                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors"></div>
                                                        <div className="w-16 h-16 rounded-full bg-accent/80 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform">
                                                            <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[12px] border-l-white border-b-8 border-b-transparent ml-1"></div>
                                                        </div>
                                                    </div>
                                                    <div className="p-6">
                                                        <h3 className="font-semibold text-lg text-white mb-2">{item.title}</h3>
                                                        <p className="text-sm text-white/60">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Highlights' && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Competition Highlights</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="bg-black/40 border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-all">
                                                <h3 className="text-xl font-bold text-accent mb-6">Most Memorable Performances</h3>
                                                <ul className="space-y-4 text-base text-white/80">
                                                    <li className="flex items-start"><span className="text-accent mr-3 mt-1">✦</span> Team Rhythm's championship-winning routine</li>
                                                    <li className="flex items-start"><span className="text-accent mr-3 mt-1">✦</span> Urban Beats' incredible freestyle battle</li>
                                                    <li className="flex items-start"><span className="text-accent mr-3 mt-1">✦</span> Groove Masters' technical showcase</li>
                                                    <li className="flex items-start"><span className="text-accent mr-3 mt-1">✦</span> Dynamic Crew's crowd-favorite performance</li>
                                                </ul>
                                            </div>
                                            <div className="bg-black/40 border border-white/10 p-8 rounded-2xl hover:border-white/20 transition-all">
                                                <h3 className="text-xl font-bold text-accent mb-6">Record-Breaking Moments</h3>
                                                <ul className="space-y-4 text-base text-white/80">
                                                    <li className="flex items-start"><span className="text-accent mr-3 mt-1">✦</span> Highest attendance: 5,000+ spectators</li>
                                                    <li className="flex items-start"><span className="text-accent mr-3 mt-1">✦</span> Most teams registered: 150+ crews</li>
                                                    <li className="flex items-start"><span className="text-accent mr-3 mt-1">✦</span> Longest performance: 8 minutes</li>
                                                    <li className="flex items-start"><span className="text-accent mr-3 mt-1">✦</span> First international team participation</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'Behind the Scenes' && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
                                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 border-b border-white/10 pb-4">Behind the Scenes</h2>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {[
                                                { title: "Stage Setup", desc: "Preparing the National Theatre stage" },
                                                { title: "Team Preparations", desc: "Teams warming up backstage" },
                                                { title: "Production Team", desc: "The crew making it all happen" }
                                            ].map((item, i) => (
                                                <div key={i} className="bg-black/40 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300">
                                                    <div className="w-full h-48 bg-white/5 flex items-center justify-center">
                                                        <span className="text-white/30 font-medium">BTS Photo</span>
                                                    </div>
                                                    <div className="p-6">
                                                        <h3 className="font-semibold text-lg text-white mb-2">{item.title}</h3>
                                                        <p className="text-sm text-white/60">{item.desc}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </GlassyCard>
                    </GlassyContainer>

                    <PartnersSection />
                </div>
            </main>

            <SocialMediaFooter />
        </div>
    );
}
