
import React from 'react'
import { IconStarFilled } from '@tabler/icons-react'

const Testimonials = () => {
    const data = [
        {
            id: 1,
            name: "Ananya Chatterjee",
            comment: "The authentic taste of ButterGarlic Naan reminded me of traditional clay ovens. Absolute perfection!",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80"
        },
        {
            id: 2,
            name: "Rahul Sharma",
            comment: "Spicy Zinger Burger was super crispy and delivered incredibly hot! Fast delivery indeed.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
        },
        {
            id: 3,
            name: "Subham Dutta",
            comment: "Highly impressed by their hygiene standard. Sourcing ingredients directly from villages makes a huge difference.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80"
        }
    ]

    return (
        <section className="py-16 bg-white border-y border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-xl mx-auto mb-12">
                    <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">What Our Foodies Say</h2>
                    <p className="text-gray-500 text-sm mt-2">Real reviews from our beloved community members</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.map((item) => (
                        <div key={item.id} className="bg-gray-50/60 rounded-2xl p-6 border border-gray-100/80 flex flex-col justify-between">
                            <p className="text-gray-600 text-sm italic leading-relaxed">"{item.comment}"</p>
                            <div className="flex items-center gap-3 mt-6 pt-4 border-t border-gray-100">
                                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" />
                                <div>
                                    <h4 className="font-bold text-gray-900 text-sm">{item.name}</h4>
                                    <div className="flex items-center gap-0.5 mt-0.5">
                                        {[...Array(5)].map((_, i) => (
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