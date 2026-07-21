import { type ReactNode } from 'react';

interface GlassyContainerProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function GlassyContainer({ children, className = '', id }: GlassyContainerProps) {
    return (
        <section 
            id={id}
            className={`relative overflow-hidden backdrop-blur-xl bg-primary/40 border-y border-white/5 shadow-2xl py-12 md:py-16 ${className}`}
        >
            {/* Ambient background glow effects */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50 mix-blend-screen pointer-events-none transform -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl opacity-50 mix-blend-screen pointer-events-none transform translate-y-1/2"></div>
            
            <div className="relative z-10 container mx-auto px-4">
                {children}
            </div>
        </section>
    );
}
