
import React from 'react';
import { IconTruck, IconToolsKitchen2, IconShieldCheck } from '@tabler/icons-react';

const CoreValues = () => {
    return (
        <section className="py-12 bg-white border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-left">
                    
                    {/* Item 1: Delivery */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-gray-50/50 rounded-2xl transition-colors">
                        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
                            <IconTruck size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-base">Super Fast Delivery</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Freshly prepared and delivered hot</p>
                        </div>
                    </div>
                    
                    {/* Item 2: Kitchen */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-gray-50/50 rounded-2xl transition-colors">
                        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
                            <IconToolsKitchen2 size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-base">Hygienic Kitchens</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Highest standard of safety and quality</p>
                        </div>
                    </div>
                    
                    {/* Item 3: Ingredients */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 p-4 hover:bg-gray-50/50 rounded-2xl transition-colors">
                        <div className="p-3 bg-emerald-50 text-emerald-700 rounded-2xl">
                            <IconShieldCheck size={28} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-base">100% Authentic Ingredients</h3>
                            <p className="text-sm text-gray-500 mt-0.5">Pure spices sourced from deep villages</p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CoreValues;