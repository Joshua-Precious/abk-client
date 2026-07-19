import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export default function TrailerSection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // IntersectionObserver to handle auto-play on scroll
        const observer = new IntersectionObserver(
            (entries: any) => {
                const [entry] = entries;
                if (entry.isIntersecting) {
                    // Use catch to prevent unhandled promise rejections if autoplay is blocked
                    videoRef.current?.play().catch(console.error);
                } else {
                    videoRef.current?.pause();
                }
            },
            { threshold: 0.3 } // Triggers when 30% of the video is visible
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !videoRef.current.muted;
            setIsMuted(videoRef.current.muted);
        }
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (videoRef.current.paused) {
                videoRef.current.play().catch(console.error);
            } else {
                videoRef.current.pause();
            }
        }
    };

    return (
        <section className="h-[40dvh] md:h-auto md:py-16 w-full">
            <div className="relative w-full h-full md:container md:mx-auto overflow-hidden">
                <div className="w-full h-full md:aspect-video flex flex-col items-center justify-center relative group overflow-hidden">

                    {/* The Video Element chunked streaming via preload="metadata" */}
                    <video
                        ref={videoRef}
                        src="https://pub-5f67caa8563f429a9f86a1fe1513d9f6.r2.dev/Video/downloadgram.org_AQO6CQNj_gDI87f2H6JeHHeTXrQbAY1TDoZ9rJ_tMbFWrXDWe4O0OFT8tNMiyP2O2qeB2QGPxmb3DwpfFWd65Jycw4kVsUVJHJEor78.mp4"
                        preload="metadata"
                        muted={isMuted}
                        loop
                        playsInline
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                        className="absolute inset-0 w-full h-full object-cover z-0"
                    />

                    {/* Gradient Overlay for better contrast on text/buttons */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent z-10 pointer-events-none"></div>

                    {/* Center Clickable Overlay & Play/Pause Button */}
                    <div
                        className="absolute inset-0 z-20 flex items-center justify-center cursor-pointer group/overlay"
                        onClick={togglePlay}
                    >
                        <div className={`w-20 h-20 md:w-28 md:h-28 rounded-full liquid-glass flex items-center justify-center border border-white/20 transition-all duration-300 transform group-hover/overlay:scale-110 ${isPlaying ? 'opacity-0 group-hover/overlay:opacity-100' : 'opacity-100 shadow-[0_0_30px_rgba(255,255,255,0.2)]'}`}>
                            {isPlaying ? (
                                <Icon icon="lucide:pause" className="w-10 h-10 md:w-14 md:h-14 text-white" />
                            ) : (
                                <Icon icon="lucide:play" className="w-10 h-10 md:w-14 md:h-14 text-white ml-2" />
                            )}
                        </div>
                    </div>

                    {/* Mute Toggle Button */}
                    <button
                        onClick={toggleMute}
                        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-20 w-12 h-12 md:w-16 md:h-16 rounded-full liquid-glass flex items-center justify-center border border-white/20 hover:scale-110 hover:bg-white/10 transition-all cursor-pointer backdrop-blur-md"
                        title={isMuted ? "Unmute Video" : "Mute Video"}
                    >
                        {isMuted ? (
                            <Icon icon="lucide:volume-x" className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        ) : (
                            <Icon icon="lucide:volume-2" className="w-6 h-6 md:w-8 md:h-8 text-white" />
                        )}
                    </button>

                </div>
            </div>
        </section>
    );
}
