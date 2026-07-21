

export default function MasonryGridSection() {
    const images = [
        { src: "/assets/mascot.png", span: "col-span-1 row-span-2" },
        { src: "/assets/teaser.png", span: "col-span-2 row-span-1" },
        { src: "/assets/monogram.webp", span: "col-span-1 row-span-1" },
        { src: "/assets/lockUp.png", span: "col-span-1 row-span-2" },
        { src: "/assets/bg.jpeg", span: "col-span-2 row-span-1" },
        { src: "/assets/mascot.png", span: "col-span-1 row-span-1" },
        { src: "/assets/bg.jpeg", span: "col-span-2 row-span-1" },
        { src: "/assets/monogram.webp", span: "col-span-1 row-span-1" },
        { src: "/assets/bg.jpeg", span: "col-span-2 row-span-1" },
        { src: "/assets/mascot.png", span: "col-span-1 row-span-1" },
    ];

    return (
        <section className="py-4 md:py-16">
            <div className="w-full px-2 md:px-0">
                <div className="grid grid-cols-4 gap-1 md:gap-4 auto-rows-[80px] sm:auto-rows-[120px] md:auto-rows-[200px]">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`relative group overflow-hidden border border-white/10 ${img.span}`}
                        >
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                            <img
                                src={img.src}
                                alt={`Gallery image ${index + 1}`}
                                loading="lazy"
                                className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
