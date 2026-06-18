
import React, { useState, useEffect } from 'react'
import { IconStarFilled } from '@tabler/icons-react'
import api from '../../services/api' 

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await api.get('/foods/featured-reviews');
                setTestimonials(response.data.data);
            } catch (error) {
                console.error("Error fetching testimonials:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchTestimonials();
    }, []);

    if (loading) return null; 

    return (
        <section className="py-16 bg-white border-y border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-12">
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">What Our Foodies Say</h2>
                    <p className="text-gray-500 text-sm mt-2">Real reviews from our beloved community members</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((item) => (
                        <div key={item._id} className="bg-gray-50/60 rounded-2xl p-6 border border-gray-100/80 flex flex-col justify-between">
                            <p className="text-gray-600 text-sm italic leading-relaxed">"{item.comment}"</p>
                            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                                <img 
                                    src={item.userImage || "https://ui-avatars.com/api/?name=" + item.name} 
                                    alt={item.name} 
                                    className="w-10 h-10 rounded-full object-cover" 
                                />
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                                    <div className="flex items-center gap-0.5 mt-0.5">
                                        {[...Array(item.rating || 5)].map((_, i) => (
                                            <IconStarFilled key={i} size={12} className="text-amber-500" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials