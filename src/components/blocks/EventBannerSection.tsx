export default function EventBannerSection() {
  return (
    <section className="w-full relative z-10 px-4 md:px-12 my-8 md:my-16">
      {/* Floating Crown Icon */}
      <img
        src="/Crown.webp"
        alt="Crown"
        className="absolute -left-4 md:-left-12 -top-16 md:-top-28 w-32 md:w-64 z-20 pointer-events-none rotate-15 origin-top-left"
      />
      <div className="w-full flex flex-col md:flex-row shadow-2xl rounded-2xl overflow-hidden">
        {/* Left side - Orange */}
        <div
          className="w-full md:w-1/2 py-10 md:py-16 px-6 flex items-center justify-center relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url('https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/people.webp')`,
          }}
        >
          {/* Orange Color Tint Overlay */}
          <div className="absolute inset-0 bg-[#d97736] mix-blend-multiply opacity-90"></div>
          {/* Subtle grunge overlay for texture */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('/grunge.jpg')] bg-cover bg-center"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight drop-shadow-md">
              ACCRA'S BIGGEST
              <br />
              DANCE EVENT
            </h2>
          </div>
        </div>

        {/* Right side - Red */}
        <div
          className="w-full md:w-1/2 py-10 md:py-16 px-6 flex items-center justify-center relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url('https://pub-792299b5bd0346ff962308668cb1f98f.r2.dev/gallery/people2.webp')`,
          }}
        >
          {/* Red Color Tint Overlay */}
          <div className="absolute inset-0 bg-[#db3b3b] mix-blend-multiply opacity-90"></div>
          {/* Subtle grunge overlay for texture */}
          <div className="absolute inset-0 opacity-20 mix-blend-overlay bg-[url('/grunge.jpg')] bg-cover bg-center"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight drop-shadow-md">
              3 ROUNDS
              <br />
              1 BIG STAGE
              <br />1 CROWN
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
