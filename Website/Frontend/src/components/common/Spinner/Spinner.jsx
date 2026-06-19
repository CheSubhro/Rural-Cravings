
import React from 'react';

const Spinner = ({ fullPage = false, message = "Loading delicious food..." }) => {
    return (
        <div className={`flex flex-col items-center justify-center gap-4 bg-white/80 backdrop-blur-xs transition-all duration-300 ${
            fullPage ? 'fixed inset-0 z-50 min-h-screen' : 'min-h-[50vh] w-full'
        }`}>
            <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin"></div>
                
                <div className="absolute w-10 h-10 rounded-full border-4 border-amber-100 border-b-amber-500 animate-spin [animation-duration:1s] reverse"></div>
                
                <div className="absolute w-3 h-3 rounded-full bg-emerald-600 animate-pulse"></div>
            </div>
            
            {message && (
                <p className="text-emerald-700 text-sm md:text-base font-bold tracking-wide animate-pulse">
                    {message}
                </p>
            )}
        </div>
    );
};

export default Spinner;