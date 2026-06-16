
import React from 'react'
import { IconCalendar, IconUser, IconArrowUpRight } from '@tabler/icons-react'

// Sub-component: BlogCard (Features list pattern)
const BlogCard = ({ blog }) => (
    <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md/5 transition-all flex flex-col">
        <div className="h-48 bg-gray-50 overflow-hidden border-b border-gray-100">
            <img src={blog.image} alt={blog.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        </div>
        <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
                <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mb-2.5">
                    <span className="flex items-center gap-1"><IconCalendar size={13}/> {blog.date}</span>
                    <span className="flex items-center gap-1"><IconUser size={13}/> {blog.author}</span>
                </div>
                <h3 className="font-bold text-gray-800 text-base leading-snug mb-2 hover:text-emerald-600 cursor-pointer">{blog.title}</h3>
                <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed mb-4">{blog.excerpt}</p>
            </div>
            <button className="text-emerald-600 font-bold text-xs flex items-center gap-1 hover:text-emerald-500 transition-colors cursor-pointer mt-auto">
                Read Article <IconArrowUpRight size={14} />
            </button>
        </div>
    </div>
)

const Blogs = () => {
    const mockBlogs = [
        { id: 1, title: "The Secret Behind Wooden-Pressed Mustard Oil", excerpt: "Discover why our ancestors always preferred wooden kachi ghani setup over modern mechanical steel extractors for heritage health benefits.", date: "12 June 2026", author: "Farhana Y.", image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=500&q=80" },
        { id: 2, title: "Grandma's Recipe: Authentic Mango Pickle Preservation", excerpt: "Learn how solar heat and cold-pressed oil can keep pickles fresh for years without using dangerous industrial chemicals.", date: "05 June 2026", author: "Subhro C.", image: "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=500&q=80" },
        { id: 3, title: "Sourcing Organic Ghee from Desi Cow Breeds", excerpt: "Exploring our active journey into local small village communities to find the rich aroma of pure handcrafted bilona churned dairy fat.", date: "28 May 2026", author: "Admin Care", image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80" }
    ]

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 min-h-[70vh]">
            <div className="mb-8">
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">Our Blog Articles</h2>
                <p className="text-gray-500 text-sm">Deep dives into ancient processing methods and nutrition tales from our village roots.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockBlogs.map(blog => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
        </div>
    )
}

export default Blogs