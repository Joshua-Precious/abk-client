import { Link } from "react-router";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="w-full mt-20">
      {/* Red Banner with Pattern Background */}
      <div
        className="w-full py-10 md:py-16 relative overflow-hidden bg-repeat bg-center"
        style={{
          backgroundImage: `url('/Footer Background.png')`,
          backgroundSize: "auto",
        }}
      >
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
            {/* Follow Us Column */}
            <div className="flex flex-col items-center md:items-start text-center md:text-left gap-2">
              <h3 className="text-3xl md:text-5xl font-black text-white drop-shadow-md leading-none">
                FOLLOW US
              </h3>
              <p className="text-lg md:text-xl font-bold text-white/95 tracking-wide drop-shadow-sm uppercase">
                @ACCRASBOOGIEKING
              </p>

              <div className="flex gap-3 mt-4">
                <a
                  href="https://facebook.com/accrasboogieking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform shadow-md"
                >
                  <Icon icon="fa-brands:facebook-f" className="w-5 h-5" />
                </a>
                <a
                  href="https://tiktok.com/@accrasboogieking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform shadow-md"
                >
                  <Icon icon="fa-brands:tiktok" className="w-5 h-5" />
                </a>
                <a
                  href="https://instagram.com/accrasboogieking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform shadow-md"
                >
                  <Icon icon="fa-brands:instagram" className="w-5 h-5" />
                </a>
                <a
                  href="https://youtube.com/accrasboogieking"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black hover:scale-110 transition-transform shadow-md"
                >
                  <Icon icon="fa-brands:youtube" className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Central Logo Column */}
            <div className="flex justify-center">
              <img
                src="/assets/monogram.webp"
                alt="ABK Logo"
                className="h-28 md:h-60 object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Contact Us Column */}
            <div className="flex flex-col items-center md:items-end text-center md:text-right gap-2">
              <h3 className="text-3xl md:text-5xl font-black text-white drop-shadow-md leading-none">
                CONTACT US
              </h3>
              <p className="text-lg md:text-xl font-bold text-white/95 tracking-wide drop-shadow-sm uppercase">
                @ACCRASBOOGIEKING
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Black bottom copyright bar */}
      <div className="bg-[#0c0c0c] py-4 border-t border-white/5">
        <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
          <p className="text-xs md:text-sm font-black tracking-wider text-white/80 uppercase">
            &copy; {new Date().getFullYear()} ACCRAS BOOGIE KING - ALL RIGHTS
            RESERVED
          </p>
          <div className="text-xs md:text-sm font-black tracking-wider text-white/80 uppercase">
            <Link to="#" className="hover:text-white transition-colors">
              PRIVACY POLICY
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
