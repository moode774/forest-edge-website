import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

/**
 * INJECTS GLOBAL RESOURCES (Fonts, Tailwind, Styles, Meta)
 * This removes the dependency on index.html content.
 */
function setupEnvironment() {
  // 1. Meta Tags
  const metaTags = [
    { name: 'description', content: 'Forest Edge - Redefining furniture manufacturing with precision engineering and timeless design. Premium custom furniture for residential and commercial spaces.' },
    { name: 'keywords', content: 'luxury furniture, custom furniture, wood furniture, office furniture, residential furniture, commercial furniture, Forest Edge' },
    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://forestedge.com/' },
    { property: 'og:title', content: 'Forest Edge | Engineering Luxury Furniture' },
    { property: 'og:description', content: 'Redefining furniture manufacturing with precision engineering and timeless design.' },
    { property: 'og:image', content: 'https://i.imgur.com/Cp8AbcG.png' },
    // Twitter
    { property: 'twitter:card', content: 'summary_large_image' },
    { property: 'twitter:url', content: 'https://forestedge.com/' },
    { property: 'twitter:title', content: 'Forest Edge | Engineering Luxury Furniture' },
    { property: 'twitter:description', content: 'Redefining furniture manufacturing with precision engineering and timeless design.' },
    { property: 'twitter:image', content: 'https://i.imgur.com/Cp8AbcG.png' }
  ];

  document.title = "Forest Edge | Engineering Luxury Furniture";

  metaTags.forEach(tag => {
    const el = document.createElement('meta');
    Object.entries(tag).forEach(([key, value]) => el.setAttribute(key, value));
    document.head.appendChild(el);
  });

  // 2. Google Fonts
  const fonts = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:ital,opsz,wght@0,9..40,200;0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap'
  ];

  // Preconnects
  const preconnect1 = document.createElement('link'); preconnect1.rel = 'preconnect'; preconnect1.href = fonts[0]; document.head.appendChild(preconnect1);
  const preconnect2 = document.createElement('link'); preconnect2.rel = 'preconnect'; preconnect2.href = fonts[1]; preconnect2.crossOrigin = 'anonymous'; document.head.appendChild(preconnect2);

  // Font Link
  const fontLink = document.createElement('link');
  fontLink.href = fonts[2];
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  // 3. Custom CSS (Scrollbar & Body)
  const style = document.createElement('style');
  style.innerHTML = `
    html { scroll-behavior: smooth; }
    ::-webkit-scrollbar { width: 8px; }
    ::-webkit-scrollbar-track { background: #f4f4f5; }
    ::-webkit-scrollbar-thumb { background: #DCC7A1; border-radius: 4px; }
    ::-webkit-scrollbar-thumb:hover { background: #6B4423; }
    body {
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      background-color: #FFFFFF;
      color: #2F2F2F;
    }
  `;
  document.head.appendChild(style);

  // 4. Configure Tailwind (Before loading script)
  const tailwindConfigScript = document.createElement('script');
  tailwindConfigScript.innerHTML = `
    tailwind = {
      config: {
        theme: {
          extend: {
            fontFamily: {
              sans: ['Inter', 'sans-serif'],
              arabic: ['"Noto Kufi Arabic"', 'sans-serif'],
            },
            colors: {
              brand: {
                white: '#FFFFFF',
                wood: '#DCC7A1',       // Light Wood
                charcoal: '#2F2F2F',   // Main Text
                green: '#6B4423',      // Rich Wooden Brown (Primary Button/Accent)
                greenHover: '#4A2F18'  // Darker Wooden Brown for hover
              },
              zinc: {
                50: '#fafafa', 100: '#f4f4f5', 200: '#e4e4e7', 300: '#d4d4d8', 400: '#a1a1aa',
                500: '#71717a', 600: '#52525b', 700: '#3f3f46', 800: '#27272a', 900: '#18181b', 950: '#09090b',
              },
            },
            animation: {
              'fade-up': 'fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              'fade-in': 'fadeIn 1.5s ease-out forwards',
              'scale-slow': 'scaleSlow 20s linear infinite alternate',
              'reveal': 'reveal 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
              'float': 'float 3s ease-in-out infinite',
            },
            keyframes: {
              fadeUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
              fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
              reveal: { '0%': { opacity: '0', clipPath: 'inset(10% 0 10% 0)' }, '100%': { opacity: '1', clipPath: 'inset(0 0 0 0)' } },
              scaleSlow: { '0%': { transform: 'scale(1)' }, '100%': { transform: 'scale(1.1)' } },
              slideInLeft: { '0%': { opacity: '0', transform: 'translateX(-50px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
              slideInRight: { '0%': { opacity: '0', transform: 'translateX(50px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
              float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } }
            }
          }
        }
      }
    }
  `;
  document.head.appendChild(tailwindConfigScript);

  // 5. Load Tailwind CDN
  const tailwindScript = document.createElement('script');
  tailwindScript.src = "https://cdn.tailwindcss.com";
  document.head.appendChild(tailwindScript);
}

// Initialize Environment
setupEnvironment();

// Ensure Root Element Exists
let rootElement = document.getElementById('root');
if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = 'root';
  document.body.appendChild(rootElement);
  document.body.classList.add('antialiased'); // Add class from original HTML
}

// Mount App
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);