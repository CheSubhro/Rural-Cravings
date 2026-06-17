
import React from 'react';
import { Link } from 'react-router-dom';
import { IconArrowRight, IconDiscount2 } from '@tabler/icons-react';

const Hero = () => {
    return (
        <section className="relative bg-emerald-950 text-white overflow-hidden py-20 sm:py-28">
            {/* Background Texture Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#e11d48_1px,transparent_1px)] [background-size:16px_16px]"></div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="max-w-2xl">
                    {/* Badge */}
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-800/60 text-emerald-300 text-xs font-bold rounded-full uppercase tracking-wider mb-6 border border-emerald-700/50">
                        <IconDiscount2 size={14} /> 100% Pure & Traditional
                    </span>
                    
                    {/* Main Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight mb-6">
                        Bringing Rural <br />
                        <span className="text-emerald-400">Trad Traditions To Your Plate</span>
                    </h1>
                    
                    {/* Subtitle / Description */}
                    <p className="text-gray-300 text-base sm:text-lg mb-8 leading-relaxed max-w-xl">
                        Experience the rich heritage of authentic flavors and freshly prepared rural delicacies. Crafted with love, sourced directly, and delivered right to your doorstep.
                    </p>
                    
                    {/* CTA Button */}
                    <Link 
                        to="/products" 
                        className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-md text-sm cursor-pointer"
                    >
                        <span>Explore Our Menu</span>
                        <IconArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Hero;