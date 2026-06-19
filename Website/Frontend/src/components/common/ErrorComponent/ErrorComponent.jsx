
import React from 'react';
import { IconAlertTriangle, IconArrowLeft } from '@tabler/icons-react';

const ErrorComponent = ({ message, onBack, fullPage = false }) => {
    return (
        <div className={`flex flex-col items-center justify-center gap-4 bg-white/80 backdrop-blur-xs transition-all duration-300 ${
            fullPage ? 'fixed inset-0 z-50 min-h-screen' : 'min-h-[50vh] w-full'
        }`}>
            {/* Error Icon */}
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center border-2 border-red-100 text-red-600">
                <IconAlertTriangle size={32} />
            </div>

            {/* Error Message */}
            <div className="text-center px-4">
                <h3 className="text-gray-900 font-black text-lg mb-1">Oops! Something went wrong</h3>
                <p className="text-red-600 font-bold text-sm tracking-wide bg-red-50 px-3 py-1 rounded-full">
                    {message || "Failed to load requested content"}
                </p>
            </div>

            {/* Back Button */}
            <button 
                onClick={onBack} 
                className="flex items-center gap-2 mt-2 px-6 py-2.5 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-colors text-sm cursor-pointer"
            >
                <IconArrowLeft size={18} /> Go Back
            </button>
        </div>
    );
};

export default ErrorComponent;