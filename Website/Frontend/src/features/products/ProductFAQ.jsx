
import React, { useState } from 'react';
import { IconChevronDown, IconTruck, IconPaperBag, IconToolsKitchen2 } from '@tabler/icons-react';

const ProductFAQ = ({ productName = "", category = "" }) => {
    
    const [openIndex, setOpenIndex] = useState(null);

    const getReheatInstruction = () => {

        const categoryString = typeof category === 'object' && category !== null
            ? (category.name || category.title || "")
            : (typeof category === 'string' ? category : "");

        const nameString = typeof productName === 'string' ? productName : "";

        const lowerName = nameString.toLowerCase();
        const lowerCategory = categoryString.toLowerCase();

        if (lowerName.includes('naan') || lowerName.includes('roti') || lowerName.includes('paratha') || lowerCategory.includes('bread')) {
            return "For Indian breads, sprinkle a few drops of water and heat on a preheated tawa for 30 seconds on each side to regain that fresh, soft texture.";
        }
        
        if (lowerName.includes('ice cream') || lowerName.includes('dessert') || lowerCategory.includes('beverage') || lowerCategory.includes('dessert')) {
            return "This is a cold/frozen item! Do not reheat. Store in the refrigerator or freezer immediately upon delivery until consumed.";
        }

        if (lowerName.includes('kabab') || lowerName.includes('tikka') || lowerName.includes('fry') || lowerCategory.includes('starter')) {
            return "For tandoori or fried items, reheating in an air fryer or oven at 180°C for 2-3 minutes keeps them perfectly crispy and juicy.";
        }

        return "For curries and gravies, microwave in a microwave-safe container for 1-2 minutes, stirring once halfway through.";
    };

    const faqData = [
        {
            icon: <IconTruck className="text-amber-600" size={18} />,
            question: "How is the food delivered?",
            answer: "Our hot & fresh items are packed in insulated thermal bags and dispatched via express delivery riders to ensure they reach your doorstep steaming hot within 30-45 mins."
        },
        {
            icon: <IconPaperBag className="text-emerald-600" size={18} />,
            question: "Is the packaging eco-friendly?",
            answer: "Yes! At Rural Cravings, we use 100% biodegradable, food-grade sustainable packaging. Our containers are microwave-safe and leak-proof."
        },
        {
            icon: <IconToolsKitchen2 className="text-blue-600" size={18} />,
            question: `How should I reheat this ${productName || 'item'}?`,
            answer: getReheatInstruction() 
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (

        <div className="mt-10 bg-white p-6 rounded-3xl border border-gray-100 shadow-xs">
            <h3 className="text-lg font-black text-gray-800 mb-4">Delivery & Preparation Guide</h3>
            <div className="space-y-3">
                {faqData.map((item, index) => {
                    const isOpen = openIndex === index;
                    return (
                        <div 
                            key={index} 
                            className="border border-gray-100 rounded-2xl overflow-hidden transition-colors duration-200"
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className={`w-full flex items-center justify-between p-4 text-left font-bold text-sm text-gray-700 transition-colors cursor-pointer ${
                                    isOpen ? 'bg-gray-50 text-gray-900' : 'hover:bg-gray-50/50'
                                }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="p-1.5 bg-white rounded-lg border border-gray-100 shadow-2xs">
                                        {item.icon}
                                    </span>
                                    <span>{item.question}</span>
                                </div>
                                <IconChevronDown 
                                    size={18} 
                                    className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-gray-700' : ''}`}
                                />
                            </button>
                            
                            <div 
                                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                                    isOpen ? 'max-h-40 border-t border-gray-50' : 'max-h-0'
                                }`}
                            >
                                <p className="p-4 text-xs font-medium text-gray-500 leading-relaxed bg-gray-50/30">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        
    );
};

export default ProductFAQ;