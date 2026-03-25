import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * PRODUCTION ENVIRONMENT SETUP
 * Injects Google Fonts and Tailwind CDN for immediate visual consistency.
 */
const setupEnvironment = () => {
  if (typeof document === 'undefined') return;

  // 1. Injected Fonts (Noto Sans & Noto Sans Arabic)
  if (!document.getElementById('font-noto')) {
    const font = document.createElement('link');
    font.id = 'font-noto';
    font.rel = 'stylesheet';
    font.href = 'https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100..900&family=Noto+Sans+Arabic:wght@100..900&display=swap';
    document.head.appendChild(font);
  }

  // 2. Tailwind CSS Injection with Luxury Wood Palette
  if (!document.getElementById('tailwind-cdn')) {
    const tw = document.createElement('script');
    tw.id = 'tailwind-cdn';
    tw.src = 'https://cdn.tailwindcss.com';
    document.head.appendChild(tw);

    tw.onload = () => {
      // @ts-ignore
      window.tailwind.config = {
        theme: {
          extend: {
            colors: {
              ikea: {
                blue: '#2A1B14',    // Deep Walnut
                yellow: '#C5A059',  // Golden Oak
                black: '#1C1C1A',   // Industrial Black
                gray: '#F4F1EE',    // Warm Gray
                darkGray: '#4D4B48',// Slate Gray
              }
            },
            fontFamily: {
              sans: ['"Noto Sans"', '"Noto Sans Arabic"', 'sans-serif'],
            }
          }
        }
      };
    };
  }

  // 3. Global Styles (Reset & Micro-animations)
  if (!document.getElementById('global-styles')) {
    const style = document.createElement('style');
    style.id = 'global-styles';
    style.innerHTML = `
      * { margin: 0; padding: 0; box-sizing: border-box; }
      body { 
        background-color: #ffffff; 
        color: #1C1C1A; 
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }
      .f-sans { font-family: "Noto Sans", "Noto Sans Arabic", sans-serif; }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: #F4F1EE; }
      ::-webkit-scrollbar-thumb { background: #2A1B14; border-radius: 10px; }
      ::selection { background: #C5A059; color: #2A1B14; }
      
      .custom-scrollbar::-webkit-scrollbar { width: 4px; }
      .custom-scrollbar::-webkit-scrollbar-thumb { background: #2A1B14/20; border-radius: 10px; }
    `;
    document.head.appendChild(style);
  }
};

// Initialize Environment
setupEnvironment();

// Mount Application
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('CRITICAL ERROR: ROOT CONTAINER NOT FOUND');
}
