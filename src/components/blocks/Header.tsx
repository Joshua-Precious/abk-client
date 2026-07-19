import { useState } from "react";
import { Icon } from "@iconify/react";
import { useNavigate, useLocation } from "react-router";

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const isMobile = window.innerWidth <= 768;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navigateToHome = () => { navigate('/'); setIsMobileMenuOpen(false); };
    const navigateToRegister = () => { navigate('/register'); setIsMobileMenuOpen(false); };
    const navigateToFAQ = () => { navigate('/faq'); setIsMobileMenuOpen(false); };
    const navigateToAbout = () => { navigate('/about'); setIsMobileMenuOpen(false); };

    const currentPage = location.pathname;

    const navItems = [
        { label: 'HOME', path: '/', action: navigateToHome },
        { label: 'ABOUT', path: '/about', action: navigateToAbout },
        { label: 'MERCH', path: '#', action: () => { } },
        { label: 'FAQS', path: '/faq', action: navigateToFAQ },
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 liquid-glass border-b border-white/10 shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between container mx-auto py-2 px-4">
                <div onClick={navigateToHome} className="cursor-pointer">
                    <img src="/assets/monogram.webp" alt="ABK" className="h-16 md:h-20 hover:scale-105 transition-transform" />
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8 text-lg">
                    {navItems.map(item => (
                        <button
                            key={item.label}
                            onClick={item.action}
                            className={`px-4 py-1.5 font-medium ${currentPage === item.path
                                ? 'text-white border-b-2 border-accent shadow-sm'
                                : 'text-white/70 hover:border-b-2 hover:border-white/10 hover:cursor-pointer'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center space-x-3">
                    {/* Hide the top Register text on mobile to fix layout (since it's already in the menu) */}
                    <button
                        onClick={navigateToRegister}
                        className="hidden md:block cursor-pointer font-bold px-6 py-2.5 text-xl"
                    >
                        REGISTER
                    </button>


                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-full bg-white/5 text-white/80 hover:text-white"
                    >
                        {isMobileMenuOpen ? <Icon icon="lucide:x" className="w-6 h-6" /> : <Icon icon="lucide:menu" className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-[#0f0f13] border-b border-white/10 p-5 flex flex-col items-center space-y-4 shadow-2xl">
                    <div className="flex flex-col items-center uppercase space-y-2 w-full">
                        {navItems.map(item => (
                            <button
                                key={item.label}
                                onClick={item.action}
                                className={`px-4 py-2 font-medium text-lg transition-all duration-300 border-b-2 ${currentPage === item.path
                                    ? 'text-white border-accent shadow-sm'
                                    : 'text-white/70 border-transparent hover:border-white/10 hover:cursor-pointer'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={navigateToRegister}
                        className="w-full max-w-[200px] pt-3.5 pb-2 rounded-full btn-glass font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 mt-2 flex items-center justify-center leading-none"
                    >
                        REGISTER
                    </button>
                </div>
            )}
        </header>
    );
}
