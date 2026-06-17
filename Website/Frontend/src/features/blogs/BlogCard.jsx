
import React from 'react';
import { IconCalendar, IconUser, IconArrowRight } from '@tabler/icons-react';

const BlogCard = ({ blog, onClick }) => {
    const formattedDate = blog?.createdAt 
        ? new Date(blog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) 
        : 'Recent Post';

    return (
        <div 
            onClick={onClick}
            className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group cursor-pointer"
        >
            {/* Image section */}
            <div className="h-52 bg-gray-50 overflow-hidden relative">
                <img 
                    src={blog?.image} 
                    alt={blog?.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80" }}
                />
            </div>
            
            {/* Details Section */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-medium">
                        <span className="flex items-center gap-1"><IconCalendar size={14}/> {formattedDate}</span>
                        <span className="flex items-center gap-1"><IconUser size={14}/> {blog?.author?.fullName || 'Rural Cravings'}</span>
                    </div>
                    
                    {/* 🎯 হোভার করলে টাইটেল এখন লোগোর মতো emerald-600 হবে */}
                    <h3 className="font-bold text-gray-800 text-lg mb-2 line-clamp-2 leading-snug group-hover:text-emerald-600 transition-colors">
                        {blog?.title}
                    </h3>
                    
                    <p className="text-gray-500 text-xs line-clamp-3 leading-relaxed mb-5">
                        {blog?.excerpt || blog?.content}
                    </p>
                </div>

                {/* 🎯 Read Full Article সেকশনটি emerald-50 ব্যাকগ্রাউন্ড ও emerald-700 টেক্সটে চেঞ্জ করা হয়েছে */}
                <div className="text-emerald-700 font-bold text-xs flex items-center gap-1 group-hover:gap-2 transition-all mt-auto bg-emerald-50/60 px-3 py-2 rounded-lg w-fit">
                    <span>Read Full Article</span>
                    <IconArrowRight size={14} />
                </div>
            </div>
        </div>
    );
};

export default BlogCard;