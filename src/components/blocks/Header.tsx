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
  const navigateToFAQ = () => {
    navigate("/faq");
    setIsMobileMenuOpen(false);
  };
  const navigateToAbout = () => {
    navigate("/about");
    setIsMobileMenuOpen(false);
  };
  const navigateToGallery = () => {
    navigate("/gallery");
    setIsMobileMenuOpen(false);
  };
  // const navigateToMerch = () => {
  //   navigate("/merch");
  //   setIsMobileMenuOpen(false);
  // };
  const navigateToVendors = () => {
    navigate("/vendors");
    setIsMobileMenuOpen(false);
  };

  const currentPage = location.pathname;

  const navItems = [
    { label: "HOME", path: "/", action: navigateToHome },
    { label: "ABOUT", path: "/about", action: navigateToAbout },
    { label: "GALLERY", path: "/gallery", action: navigateToGallery },
    // { label: "MERCH", path: "/merch", action: navigateToMerch },
    { label: "VENDORS", path: "/vendors", action: navigateToVendors },
    { label: "FAQS", path: "/faq", action: navigateToFAQ },
  ];

  // Single-line bar: about 44px tall on mobile, 56px on desktop.
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FF0000] border-b border-white/10 shadow-lg transition-all duration-300">
      <div className="container mx-auto flex items-center justify-between gap-3 px-4 py-1.5 md:py-2">
        <div onClick={navigateToHome} className="cursor-pointer shrink-0">
          <img
            src="/assets/monogram.webp"
            alt="ABK"
            className="h-16 md:h-20 w-auto hover:scale-105 transition-transform"
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 lg:gap-3 text-sm lg:text-base">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`px-4 py-1.6 font-bold tracking-wider ${
                currentPage === item.path
                  ? "text-white border-b-2 border-white"
                  : "text-white/70 hover:border-b-2 hover:border-white/10 hover:cursor-pointer"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          className="md:hidden shrink-0 text-white/80 hover:text-white"
        >
          {isMobileMenuOpen ? (
            <Icon icon="lucide:x" className="h-5 w-5" />
          ) : (
            <Icon icon="lucide:menu" className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0f0f13] border-b border-white/10 py-2 flex flex-col items-stretch shadow-2xl">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`px-5 py-2.5 text-left text-base font-bold uppercase tracking-wider transition-colors ${
                currentPage === item.path
                  ? "text-white bg-white/5"
                  : "text-white/70"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
