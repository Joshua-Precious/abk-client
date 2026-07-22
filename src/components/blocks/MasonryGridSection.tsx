import { useState } from "react";

export default function MasonryGridSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const images = [
    // Original 6 images (Rows 1-2)
    {
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/ACCRA'S%20BOOGIE%20KING%20FIRST%20LOVE%20CHURCH%20.%20DAG%20HEWARD-MILLS_76.webp",
      span: "col-span-1 row-span-2",
    },
    {
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/compressed/Accras%20Boogie%20KIng%202025%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_500%20(1).webp",
      span: "col-span-2 row-span-1",
    },
    {
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/compressed/Accras%20Boogie%20KIng%202025%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_168%20(1).webp",
      span: "col-span-1 row-span-1",
    },
    {
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/compressed/Accras%20Boogie%20KIng%202025%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_213%20(1).webp",
      span: "col-span-1 row-span-1",
    },
    {
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/compressed/Accras%20Boogie%20KIng%202025%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_319%20(1).webp",
      span: "col-span-1 row-span-1",
    },
    {
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/compressed/Accra%20Boogies%20King%2020251502%20(1).webp",

      span: "col-span-1 row-span-1",
    },
    // New 4 images (Rows 3-4)
    {
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/576383800_1300039362152139_3651571975493525598_n.webp",
      span: "col-span-1 row-span-2",
    }, // Tall
    {
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/577828605_1300038982152177_8171455739245762554_n.webp",
      span: "col-span-2 row-span-1",
    }, // Wide
    {
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/compressed/Accra%20Boogies%20King%2020251509%20(2).webp",

      span: "col-span-1 row-span-2",
    }, // Tall
    {
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/ACCRA'S%20BOOGIE%20KING%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_72.webp",
      span: "col-span-2 row-span-1",
    }, // Wide
  ];

  return (
    <section className="py-4 md:py-16">
      <div className="w-full px-2 md:px-0">
        <div className="grid grid-cols-4 gap-1 md:gap-4 auto-rows-20 sm:auto-rows-30 md:auto-rows-50">
          {images.map((img, index) => (
            <div
              key={index}
              className={`relative group overflow-hidden border border-white/10 ${img.span}`}
            >
              <button
                onClick={() => setSelectedImage(img.src)}
                className="w-full h-full block cursor-pointer"
                aria-label={`Open gallery image ${index + 1}`}
              >
                <img
                  src={img.src}
                  alt={`Gallery image ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
          <img
            src={selectedImage}
            alt="Gallery preview"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
