
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogById } from '../store/blogSlice';
import { IconCalendar, IconUser, IconArrowLeft } from '@tabler/icons-react';

const BlogDetails = () => {
    const { blogId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { currentBlog, isLoading, error } = useSelector((state) => state.blog);

    useEffect(() => {
        if (blogId) {
            dispatch(fetchBlogById(blogId));
        }
    }, [dispatch, blogId]);

    // Loading State
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
                <div className="w-10 h-10 border-4 border-t-emerald-600 border-gray-200 rounded-full animate-spin"></div>
                <p className="text-sm font-semibold text-gray-500">Loading recipe secrets...</p>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="container mx-auto px-4 py-10 max-w-3xl text-center">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 text-sm font-medium">
                    {error}
                </div>
                <button 
                    onClick={() => navigate('/blogs')}
                    className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm hover:underline"
                >
                    <IconArrowLeft size={16} /> Back to Blogs
                </button>
            </div>
        );
    }

    if (!currentBlog) return null;

    const formattedDate = currentBlog.createdAt 
        ? new Date(currentBlog.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) 
        : 'Recent Post';

    return (
        <div className="container mx-auto px-4 py-10 max-w-3xl min-h-[80vh]">
            {/* Back Button */}
            <button 
                onClick={() => navigate(-1)} 
                className="inline-flex items-center gap-2 text-gray-500 hover:text-emerald-600 font-semibold text-sm mb-6 transition-colors cursor-pointer group"
            >
                <IconArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
            </button>

            {/* Blog Header */}
            <div className="mb-6">
                <h1 className="text-2xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight mb-4">
                    {currentBlog.title}
                </h1>
                
                <div className="flex items-center gap-4 text-xs sm:text-sm text-gray-500 font-medium border-b border-gray-100 pb-6">
                    <span className="flex items-center gap-1.5"><IconCalendar size={16} className="text-emerald-600"/> {formattedDate}</span>
                    <span className="flex items-center gap-1.5"><IconUser size={16} className="text-emerald-600"/> {currentBlog.author?.fullName || 'Rural Cravings'}</span>
                </div>
            </div>

            {/* Featured Image */}
            <div className="w-full h-64 sm:h-[400px] bg-gray-50 rounded-2xl overflow-hidden shadow-xs mb-8">
                <img 
                    src={currentBlog.image} 
                    alt={currentBlog.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80" }}
                />
            </div>

            {/* Excerpt / Summary Card */}
            {currentBlog.excerpt && (
                <div className="bg-emerald-50/40 border-l-4 border-emerald-600 p-4 rounded-r-xl mb-6 italic text-gray-700 text-sm sm:text-base leading-relaxed">
                    "{currentBlog.excerpt}"
                </div>
            )}

            {/* Main Content Body */}
            <div className="prose max-w-none text-gray-800 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium">
                {currentBlog.content}
            </div>
        </div>
    );
};

export default BlogDetails;