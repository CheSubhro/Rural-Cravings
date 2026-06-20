
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchBlogs } from '../store/blogSlice';
import BlogCard from '../features/blogs/BlogCard';
import Spinner from '../components/common/Spinner/Spinner'
import ErrorComponent from '../components/common/ErrorComponent/ErrorComponent';

const Blogs = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { blogs, isLoading, error } = useSelector((state) => state.blog);

    useEffect(() => {
        dispatch(fetchBlogs());
    }, [dispatch]);

    // Loading State
    if (isLoading) {
        return <Spinner message="Fetching heritage kitchen stories..." />;
    }

    // Error State
    if (error) {
        return <ErrorComponent message={error} onBack={() => dispatch(fetchBlogs())} />;
    }

    return (
        <div className="container mx-auto px-4 py-10 max-w-6xl min-h-[80vh]">
            {/* Header Title Section */}
            <div className="text-center mb-12 max-w-2xl mx-auto">
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight mb-3">
                    Our Food Legacy & Blogs
                </h1>
                <p className="text-sm text-gray-500 leading-relaxed">
                    Discover authentic rural taste stories, traditional preparation methods, and deep healthy nutrition values from old roots.
                </p>
            </div>

            {/* Error Message Section */}
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-8 text-sm font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    {error}
                </div>
            )}

            {/* Dynamic Blog Grid */}
            {!blogs || blogs.length === 0 ? (
                <div className="flex items-center justify-center py-16 bg-white border border-dashed border-gray-200 rounded-2xl">
                    <p className="text-sm text-gray-400 font-medium">
                        No food logs or articles available at the moment.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
                    {blogs.map((blog) => (
                        <BlogCard 
                            key={blog._id} 
                            blog={blog} 
                            onClick={() => navigate(`/blogs/${blog._id}`)} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Blogs;