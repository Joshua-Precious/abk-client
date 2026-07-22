export default function MasonryGridSection() {
  const images = [
    // Original 6 images (Rows 1-2)
    {
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/compressed/Accra%20Boogies%20King%2020251502%20(1).webp",
      span: "col-span-1 row-span-2",
    },
    {
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/compressed/Accra%20Boogies%20King%2020251509%20(2).webp",
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
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/compressed/Accras%20Boogie%20KIng%202025%20FIRST%20LOVE%20CHURCH%20DAG%20HEWARD-MILLS_500%20(1).webp",
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
      src: "https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/ACCRA'S%20BOOGIE%20KING%20FIRST%20LOVE%20CHURCH%20.%20DAG%20HEWARD-MILLS_76.webp",
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
