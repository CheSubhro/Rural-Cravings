
import React, { useState } from 'react';
import { IconToolsKitchen2 } from '@tabler/icons-react';
import { toast } from 'react-toastify';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        
        console.log("Subscribed email:", email);
        
        toast.success("🎉 Thank you for subscribing! Check your inbox for the 15% off coupon.");
        setEmail(''); 
    };

    return (
        <section className="py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-emerald-700 rounded-3xl p-8 sm:p-12 lg:p-16 text-white relative overflow-hidden shadow-xl">
                    {/* Background SVG Icon */}
                    <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                        <IconToolsKitchen2 size={300} className="-mr-10 -mb-10 text-white" />
                    </div>
                    
                    <div className="relative z-10 max-w-xl">
                        <h2 className="text-2xl sm:text-4xl font-black tracking-tight mb-4">
                            Never Miss Out On Traditional Flavors!
                        </h2>
                        <p className="text-emerald-100 text-sm sm:text-base mb-8 leading-relaxed">
                            Subscribe to our weekly cravings newsletter to get exclusive deals, traditional food recipes, and 15% off on your next order.
                        </p>
                        
                        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address" 
                                className="px-4 py-3 bg-white text-gray-900 placeholder-gray-400 font-medium text-sm rounded-xl focus:outline-hidden w-full"
                                required
                            />
                            <button 
                                type="submit" 
                                className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm rounded-xl transition-colors whitespace-nowrap cursor-pointer"
                            >
                                Subscribe Now
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;