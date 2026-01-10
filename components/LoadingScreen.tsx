import React from 'react';

export const LoadingScreen: React.FC<{ isLoading: boolean }> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-brand-white flex items-center justify-center transition-opacity duration-500">
      <div className="text-center">
        {/* Logo */}
        <div className="mb-8 animate-fade-in">
          <img 
            src="https://i.imgur.com/Cp8AbcG.png" 
            alt="Forest Edge" 
            className="h-16 md:h-20 w-auto mx-auto object-contain"
          />
        </div>
        
        {/* Loading Bar */}
        <div className="w-48 h-1 bg-zinc-100 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-brand-green rounded-full animate-loading-bar"></div>
        </div>
        
        {/* Loading Text */}
        <p className="mt-6 text-sm text-brand-charcoal/60 font-medium tracking-wide animate-pulse">
          Loading Excellence...
        </p>
      </div>
      
      <style>{`
        @keyframes loading-bar {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        .animate-loading-bar {
          animation: loading-bar 1.5s ease-in-out;
        }
      `}</style>
    </div>
  );
};
