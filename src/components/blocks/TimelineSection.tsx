import React from "react";
import { Icon } from "@iconify/react";

interface TimelineEvent {
    date: string;
    title: string;
    description: string;
    icon: string;
    side: "left" | "right";
    active?: boolean;
    circleClass: string;
    iconClass: string;
    cardHoverClass: string;
    dateColorClass: string;
}

const timelineEvents: TimelineEvent[] = [
    {
        date: "July 20 - July 30, 2026",
        title: "Online Auditions",
        description: "Dancers submit registration forms and audition videos online. Open for all solo dancers and crews.",
        icon: "lucide:user-plus",
        side: "left",
        active: true,
        circleClass: "bg-purple-500/20 border-purple-500 shadow-lg shadow-purple-500/20 animate-pulse",
        iconClass: "text-purple-400",
        cardHoverClass: "hover:border-purple-500/30 hover:shadow-[0_0_20px_rgba(168,85,247,0.15)]",
        dateColorClass: "text-purple-400",
    },
    {
        date: "August 10 - August 15, 2026",
        title: "Intensive Rehearsals",
        description: "Selected qualifiers proceed to live rehearsal camps and intensive group practice sessions with top mentors.",
        icon: "lucide:flame",
        side: "right",
        circleClass: "bg-black/60 border-white/20 group-hover:bg-pink-500/10 group-hover:border-pink-500",
        iconClass: "text-white/60 group-hover:text-pink-400",
        cardHoverClass: "hover:border-pink-500/30 hover:shadow-[0_0_20px_rgba(236,72,153,0.15)]",
        dateColorClass: "text-pink-400",
    },
    {
        date: "August 28 - August 30, 2026",
        title: "Regional Battles",
        description: "Live stage performances and head-to-head battle rounds across key regional centers.",
        icon: "lucide:tv",
        side: "left",
        circleClass: "bg-black/60 border-white/20 group-hover:bg-orange-500/10 group-hover:border-orange-500",
        iconClass: "text-white/60 group-hover:text-orange-400",
        cardHoverClass: "hover:border-orange-500/30 hover:shadow-[0_0_20px_rgba(249,115,22,0.15)]",
        dateColorClass: "text-orange-400",
    },
    {
        date: "September 12 - September 15, 2026",
        title: "Finalist Workshops",
        description: "The top remaining crews join masterclasses with international guest choreographers to prepare final routines.",
        icon: "lucide:sparkles",
        side: "right",
        circleClass: "bg-black/60 border-white/20 group-hover:bg-cyan-500/10 group-hover:border-cyan-500",
        iconClass: "text-white/60 group-hover:text-cyan-400",
        cardHoverClass: "hover:border-cyan-500/30 hover:shadow-[0_0_20px_rgba(6,182,212,0.15)]",
        dateColorClass: "text-cyan-400",
    },
    {
        date: "September 25, 2026",
        title: "The Grand Finale",
        description: "The ultimate showdown to crown the Accra Boogie King 2026 live on the National Theatre stage.",
        icon: "lucide:trophy",
        side: "left",
        circleClass: "bg-black/60 border-white/20 group-hover:bg-green-500/10 group-hover:border-green-500",
        iconClass: "text-white/60 group-hover:text-green-400",
        cardHoverClass: "hover:border-green-500/30 hover:shadow-[0_0_20px_rgba(34,197,94,0.15)]",
        dateColorClass: "text-green-400",
    },
];

export default function TimelineSection() {
    return (
        <section className="container mx-auto px-4 py-12 md:py-24 relative z-10">
            <div className="max-w-5xl mx-auto text-center flex flex-col gap-2">
                <h2 className="text-2xl md:text-4xl font-black text-white uppercase">
                    TIMELINE OF ABK 26
                </h2>

                {/* Timeline Tree Wrapper */}
                <div className="relative mt-12 md:mt-24">
                    {/* Chromatic vertical line rising from green at bottom to purple at top */}
                    <div
                        className="absolute left-6 md:left-1/2 top-4 bottom-4 transform -translate-x-1/2 w-[3px]"
                        style={{
                            background: "linear-gradient(to top, #22c55e 0%, #06b6d4 25%, #f97316 50%, #ec4899 75%, #a855f7 100%)"
                        }}
                    ></div>

                    {/* Timeline items */}
                    <div className="flex flex-col gap-12 md:gap-16 relative">
                        {timelineEvents.map((event, index) => {
                            return (
                                <div key={index} className="relative flex flex-col md:flex-row items-center justify-between group">
                                    {/* Central Indicator Dot */}
                                    <div className="absolute left-6 md:left-1/2 transform -translate-x-1/2 z-20 flex items-center justify-center">
                                        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 shadow-2xl transition-all duration-500 group-hover:scale-110 ${event.circleClass}`}>
                                            <Icon icon={event.icon} className={`w-5 h-5 transition-colors duration-300 ${event.iconClass}`} />
                                        </div>
                                    </div>

                                    {/* Left Container */}
                                    <div className="w-full md:w-[45%] pl-16 md:pl-0 md:text-right">
                                        {event.side === "left" && (
                                            <div className={`liquid-glass border border-white/10 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 md:ml-auto max-w-md text-left ${event.cardHoverClass}`}>
                                                <span className={`text-xs md:text-sm font-bold tracking-wider block mb-2 ${event.dateColorClass}`}>{event.date}</span>
                                                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{event.title}</h3>
                                                <p className="text-xs md:text-sm text-white/60 leading-relaxed">{event.description}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Central Spacer */}
                                    <div className="hidden md:block md:w-[8%]" />

                                    {/* Right Container */}
                                    <div className="w-full md:w-[45%] pl-16 md:pl-0 md:text-left">
                                        {event.side === "right" && (
                                            <div className={`liquid-glass border border-white/10 rounded-2xl p-6 transition-all duration-300 transform hover:-translate-y-1 md:mr-auto max-w-md text-left ${event.cardHoverClass}`}>
                                                <span className={`text-xs md:text-sm font-bold tracking-wider block mb-2 ${event.dateColorClass}`}>{event.date}</span>
                                                <h3 className="text-lg md:text-xl font-bold text-white mb-2">{event.title}</h3>
                                                <p className="text-xs md:text-sm text-white/60 leading-relaxed">{event.description}</p>
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

