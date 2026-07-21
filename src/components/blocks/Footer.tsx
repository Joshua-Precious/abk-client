import { Link } from "react-router";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <footer className="relative mt-20">
      <div className="liquid-glass py-10 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-200 bg-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className=" relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16 items-center text-center">
            {/* Brand Column */}
            <div className="flex flex-col items-center gap-6">
              <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center relative group cursor-pointer">
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-2xl group-hover:bg-accent/40 transition-all duration-500"></div>
                <img
                  src="/assets/lockUp.png"
                  alt="Accra's Boogie King Logo"
                  className="relative max-w-full max-h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] group-hover:scale-110 group-hover:drop-shadow-[0_0_25px_rgba(255,255,255,0.5)] transition-all duration-500"
                />
              </div>
              <p className="text-white text-sm max-w-70 leading-relaxed">
                Join the ultimate dance competition. Bring your best moves and
                claim the crown in Accra's biggest showdown.
              </p>
            </div>

            {/* Connect Column */}
            <div className="flex flex-col items-center gap-6 pt-4">
              <h3 className="text-lg font-bold tracking-widest text-white uppercase mb-2 relative inline-block">
                Connect
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-purple-500 rounded-full"></div>
              </h3>

              <div className="flex flex-col items-center gap-4 mt-2 text-white">
                <a
                  href="mailto:accrasboogieking@gmail.com"
                  className="inline-flex items-center gap-3 text-sm md:text-base font-medium text-white/90 hover:text-white transition-colors"
                >
                  <Icon icon="lucide:mail" className="w-5 h-5" />
                  <span>accrasboogieking@gmail.com</span>
                </a>

                <div className="flex justify-center gap-5">
                  <a
                    href="https://www.instagram.com/accrasboogieking"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-14 h-14 rounded-full flex items-center justify-center bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:border-transparent hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Icon
                      icon="lucide:instagram"
                      className="w-6 h-6 text-white relative z-10 group-hover:text-white group-hover:scale-110 transition-all duration-500"
                    />
                  </a>
                  <a
                    href="https://www.tiktok.com/@accrasboogieking"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative w-14 h-14 rounded-full flex items-center justify-center bg-white/5 border border-white/10 overflow-hidden transition-all duration-500 hover:border-transparent hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1"
                  >
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Icon
                      icon="simple-icons:tiktok"
                      className="w-6 h-6 text-white relative z-10 group-hover:text-white group-hover:scale-110 transition-all duration-500"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Questions Column */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <p className="text-sm text-white/60 mb-2">Have questions?</p>
              <span className="text-sm text-white/90 font-medium">
                DM us or email anytime
              </span>
            </div>
          </div>

          {/* Divider & Copyright */}
          <div className="pt-8 border-t container mx-auto border-white/10 flex flex-col md:flex-row justify-between px-6 md:px-12 items-center gap-6 text-center">
            <p className="text-sm font-medium tracking-wider text-white uppercase">
              &copy; {new Date().getFullYear()} ACCRA'S BOOGIE KING
            </p>
            <div className="flex justify-center gap-8 text-sm text-white">
              <Link to="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
