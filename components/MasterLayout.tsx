import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useLang } from '../store/context/LangContext';

interface MasterLayoutProps {
    children: React.ReactNode;
}

export const MasterLayout: React.FC<MasterLayoutProps> = ({ children }) => {
    const { pathname } = useLocation();
    const { lang } = useLang();
    const dir = lang === 'ar' ? 'rtl' : 'ltr';

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="min-h-screen flex flex-col bg-white selection:bg-ikea-yellow selection:text-ikea-blue font-sans" dir={dir}>
            <Navbar />
            <main className="flex-grow pt-[112px]">
                {children}
            </main>
            <Footer />
        </div>
    );
};
