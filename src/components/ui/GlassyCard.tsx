import { type ReactNode } from 'react';

interface GlassyCardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

export default function GlassyCard({ children, className = '', onClick }: GlassyCardProps) {
    return (
        <div 
            onClick={onClick}
            className={`liquid-glass chromatic-edge rounded-xl transition-all duration-300 ${onClick ? 'cursor-pointer hover:bg-white/10 hover:-translate-y-1' : ''} ${className}`}
        >
            {children}
        </div>
    );
}
