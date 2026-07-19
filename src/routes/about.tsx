import Header from "../components/blocks/Header";
import Footer from "../components/blocks/Footer";

export default function About() {
    const galleryItems = [
        { id: 1, title: "ABK 23", image: "https://picsum.photos/seed/abk23/600/400" },
        { id: 2, title: "ABK 24", image: "https://picsum.photos/seed/abk24/600/400" },
        { id: 3, title: "ABK 25", image: "https://picsum.photos/seed/abk25/600/400" },
    ];

    return (
        <div className="flex flex-col min-h-screen text-neutral-content">
            <Header />

            <main className="pt-24 md:pt-32 flex-grow relative z-10 container mx-auto px-4 pb-20">
                {/* ABOUT Title */}
                <div className="text-center mb-16 section-fade-in">
                    <h1 className="text-6xl md:text-8xl font-bold text-primary-content mb-4 tracking-wider uppercase" style={{ textShadow: '0 4px 12px rgba(240,180,5,0.4)' }}>
                        About
                    </h1>
                    <div className="w-32 h-1 bg-white/30 mx-auto rounded-full mb-2"></div>
                    <div className="w-48 h-1 bg-white/20 mx-auto rounded-full"></div>
                </div>

                {/* HALL OF FAME Section */}
                <section className="mb-24 flex flex-col items-center section-fade-in" style={{ animationDelay: '0.1s' }}>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 border-2 border-white/20 px-8 py-3 rounded-lg liquid-glass backdrop-blur-sm transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
                        HALL OF FAME
                    </h2>
                    <div className="w-full max-w-4xl liquid-glass rounded-2xl p-8 md:p-12 text-center text-lg text-white/80 leading-relaxed shadow-xl border border-white/5">
                        <p>Welcome to the Hall of Fame. Here we celebrate the legends and unforgettable moments of ABK history.</p>
                        {/* Mock data for Hall of Fame */}
                        <div className="mt-10 grid grid-cols-3 gap-6">
                            {[23, 24, 25].map((i) => (
                                <div key={i} className="flex flex-col items-center group cursor-pointer">
                                    <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-white/20 mb-4 flex items-center justify-center overflow-hidden group-hover:border-primary-content transition-colors group-hover:shadow-[0_0_15px_rgba(240,180,5,0.4)]">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=ABK${i}`} alt="Avatar" className="w-20 h-20 group-hover:scale-110 transition-transform" />
                                    </div>
                                    <span className="font-medium text-white/90 group-hover:text-primary-content transition-colors">Winners '{i}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* GALLERY Section */}
                <section className="mb-24 flex flex-col items-center section-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="inline-block relative mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white pb-2 relative z-10">
                            GALLERY
                        </h2>
                        <div className="absolute -bottom-1 left-0 right-0 h-3 bg-primary-content/30 -skew-x-12 z-0"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                        {galleryItems.map((item) => (
                            <div key={item.id} className="group relative rounded-xl overflow-hidden cursor-pointer shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                <div className="aspect-[4/3] bg-neutral overflow-hidden border border-white/10 rounded-xl">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 mix-blend-luminosity group-hover:mix-blend-normal"
                                    />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                                    <h3 className="text-2xl font-bold text-white group-hover:text-primary-content transition-colors flex items-center justify-between">
                                        {item.title}
                                        <span className="opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all text-primary-content">
                                            →
                                        </span>
                                    </h3>
                                </div>
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-content/30 rounded-xl transition-colors duration-300 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SPONSOR ABK Button */}
                <section className="flex justify-center mb-12 section-fade-in" style={{ animationDelay: '0.3s' }}>
                    <button className="px-10 py-5 text-xl md:text-2xl font-bold rounded-xl btn-glass bg-white/5 hover:bg-white/10 text-white border-2 border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.15)] transform hover:scale-105 transition-all flex items-center gap-3">
                        <span>SPONSOR ABK</span>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </button>
                </section>
            </main>

            <Footer />
        </div>
    );
}
