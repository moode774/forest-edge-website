import React, { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLang } from '../App';

interface MasterLayoutProps {
    children: React.ReactNode;
}

export const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
    const { pathname } = useLocation();
    const { lang } = useLang();
    const cursorRef = useRef<HTMLDivElement>(null);
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    const onMouseMove = useCallback((e: MouseEvent) => {
        if (cursorRef.current) {
            cursorRef.current.style.left = e.clientX + 'px';
            cursorRef.current.style.top = e.clientY + 'px';
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, [pathname, onMouseMove]);

    return (
        <div className="min-h-screen flex flex-col bg-[#FDFCFB] selection:bg-[#282828] selection:text-[#FDFCFB]" dir={dir}>
            <style>{`
                .f-serif { font-family: 'Playfair Display', serif; }
                .f-sans { font-family: 'DM Sans', sans-serif; }
                
                .grain::before {
                    content: '';
                    position: fixed;
                    inset: -50%;
                    width: 200%;
                    height: 200%;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
                    opacity: 0.015;
                    pointer-events: none;
                    z-index: 9998;
                    animation: grain 0.5s steps(1) infinite;
                }
                @keyframes grain {
                    0%, 100% { transform: translate(0, 0); }
                    10% { transform: translate(-2%, -2%); }
                    20% { transform: translate(2%, 2%); }
                    30% { transform: translate(-1%, 2%); }
                    40% { transform: translate(2%, -1%); }
                    50% { transform: translate(-2%, 1%); }
                    60% { transform: translate(1%, -2%); }
                    70% { transform: translate(-1%, 1%); }
                    80% { transform: translate(2%, 2%); }
                    90% { transform: translate(-2%, -1%); }
                }

                .cursor-glow {
                    position: fixed;
                    width: 300px;
                    height: 300px;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    background: radial-gradient(circle, rgba(138,122,107,0.06) 0%, transparent 70%);
                    transform: translate(-50%, -50%);
                    transition: opacity 0.3s;
                }
                @media (max-width: 768px) {
                    .cursor-glow { display: none; }
                }
            `}</style>
            
            <div className="grain" />
            <div ref={cursorRef} className="cursor-glow" />
            
            <Navbar />
            <main className="flex-grow pt-20">
                {children}
            </main>
            <Footer />
        </div>
    );
};
