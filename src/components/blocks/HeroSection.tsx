
export default function HeroSection() {
    return (
        <div className="relative w-full h-[60dvh] md:h-[100dvh] flex items-center justify-center overflow-hidden">
            {/* Background Video */}
            <video 
                autoPlay 
                muted 
                loop 
                playsInline
                poster="/assets/lockUp.png"
                className="absolute inset-0 w-full h-full object-cover z-0"
            >
                <source src="https://pub-5f67caa8563f429a9f86a1fe1513d9f6.r2.dev/Video/IMG_0552.MP4" type="video/mp4" />
            </video>
        </div>
    );
}
