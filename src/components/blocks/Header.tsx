import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigateToHome = () => {
    navigate("/");
    setIsMobileMenuOpen(false);
  };
  const navigateToRegister = () => {
    navigate("/register");
    setIsMobileMenuOpen(false);
  };
  const navigateToFAQ = () => {
    navigate("/faq");
    setIsMobileMenuOpen(false);
  };
  const navigateToAbout = () => {
    navigate("/about");
    setIsMobileMenuOpen(false);
  };
  const navigateToMerch = () => {
    navigate("/merch");
    setIsMobileMenuOpen(false);
  };
  const navigateToVendors = () => {
    navigate("/vendors");
    setIsMobileMenuOpen(false);
  };

  const currentPage = location.pathname;

  const navItems = [
    { label: "HOME", path: "/", action: navigateToHome },
    { label: "ABOUT", path: "/about", action: navigateToAbout },
    { label: "MERCH", path: "/merch", action: navigateToMerch },
    { label: "VENDORS", path: "/vendors", action: navigateToVendors },
    { label: "FAQS", path: "/faq", action: navigateToFAQ },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FF0000] border-b border-white/10 shadow-xl transition-all duration-300">
      <div className="flex items-center justify-between container mx-auto py-2 px-4">
        <div onClick={navigateToHome} className="cursor-pointer">
          <img
            src="/assets/monogram.webp"
            alt="ABK"
            className="h-16 md:h-20 hover:scale-105 transition-transform"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`px-4 py-1.5 font-medium ${
                currentPage === item.path
                  ? "text-white border-b-4 border-white font-bold shadow-sm"
                  : "text-white/70 hover:border-b-2 hover:border-white/10 hover:cursor-pointer"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={navigateToRegister}
            className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-white bg-[linear-gradient(180deg,#ff3b00_0%,#ff1f5b_35%,#7a2cff_100%)] px-4 py-2.5 text-center font-extrabold uppercase text-white shadow-[0_0_18px_rgba(255,255,255,0.22),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_22px_rgba(255,255,255,0.28),inset_0_1px_0_rgba(255,255,255,0.55)] active:scale-[0.98] md:px-6 md:py-3"
          >
            <span className="block text-sm md:text-base leading-tight tracking-wider text-center w-full">
              REGISTER
            </span>
            <span className="block text-xs md:text-sm leading-tight tracking-[0.2em] text-center w-full mt-0.5">
              A TEAM
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white/80 hover:text-white"
          >
            {isMobileMenuOpen ? (
              <Icon icon="lucide:x" className="w-6 h-6" />
            ) : (
              <Icon icon="lucide:menu" className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0f0f13] border-b border-white/10 p-5 flex flex-col items-center space-y-4 shadow-2xl">
          <div className="flex flex-col items-center uppercase space-y-2 w-full">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.action}
                className={`px-4 py-2 font-medium text-lg transition-all duration-300 border-b-2 ${
                  currentPage === item.path
                    ? "text-white border-b-4 border-white font-bold shadow-sm"
                    : "text-white/70 border-transparent hover:border-white/10 hover:cursor-pointer"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            onClick={navigateToRegister}
            className="mt-2 flex w-full max-w-50 flex-col items-center justify-center rounded-xl border-2 border-white bg-[linear-gradient(180deg,#ff3b00_0%,#ff1f5b_35%,#7a2cff_100%)] px-4 py-3 text-center font-extrabold uppercase text-white shadow-[0_0_18px_rgba(255,255,255,0.22),inset_0_1px_0_rgba(255,255,255,0.45)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_22px_rgba(255,255,255,0.28),inset_0_1px_0_rgba(255,255,255,0.55)] active:scale-[0.98]"
          >
            <span className="block text-sm leading-tight tracking-wider text-center w-full">
              REGISTER
            </span>
            <span className="block text-xs leading-tight tracking-[0.2em] text-center w-full mt-0.5">
              A TEAM
            </span>
          </button>
        </div>
      )}
    </header>
  );
}
