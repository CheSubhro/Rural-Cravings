
import React, { useState } from 'react'
import { IconStarFilled, IconLoader2, IconMessage2Off } from '@tabler/icons-react'
import { toast } from 'react-toastify'
import api from '../../services/api'

const ProductReviewsSection = ({ product, onReviewSubmit }) => {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            toast.error("Please write a comment before submitting.");
            return;
        }

        setIsSubmitting(true);
        try {
            await api.put('/foods/review', {
                rating,
                comment: comment.trim(),
                foodItemId: product._id
            });

            toast.success("🎉 Review submitted successfully!");
            setComment('');
            
            if (onReviewSubmit) {
                onReviewSubmit(); 
            }
        } catch (error) {
            console.error("Review submit error:", error);
            const errorMsg = error.response?.data?.message || "Please login to submit a review!";
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const getInitials = (name) => {
        return name ? name.charAt(0).toUpperCase() : 'U';
    };

    return (
        <div className="mt-10 pt-8 border-t border-gray-100 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight">Write a Review</h3>
                    <p className="text-xs text-gray-400 mt-0.5">Share your traditional dining experience with others.</p>
                </div>
                
                <form onSubmit={handleReviewSubmit} className="space-y-4 bg-gray-50/70 p-5 rounded-2xl border border-gray-100/80 shadow-xs">
                    {/* ... (Rating and Textarea remain same) ... */}
                    <div className="space-y-1">
                        <span className="text-xs text-gray-500 font-semibold block">Your Rating</span>
                        <div className="flex gap-1.5 py-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button key={star} type="button" onClick={() => setRating(star)} className="cursor-pointer transition-transform hover:scale-110 active:scale-95">
                                    <IconStarFilled size={22} className={star <= rating ? "text-amber-500" : "text-gray-200"} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-1">
                        <textarea rows="4" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Share your thoughts..." className="w-full p-3.5 bg-white border border-gray-200 rounded-xl text-sm" required disabled={isSubmitting} />
                    </div>
                    <button type="submit" disabled={isSubmitting} className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2">
                        {isSubmitting ? <><IconLoader2 size={16} className="animate-spin" /> <span>Submitting...</span></> : <span>Submit Review</span>}
                    </button>
                </form>
            </div>
            
            {/* Feedback Section (Same as before) */}
            <div className="lg:col-span-2 space-y-4">
                <h3 className="text-lg font-bold">Customer Feedback ({product.reviews?.length || 0})</h3>
                {product.reviews && product.reviews.length > 0 ? (
                    <div className="space-y-4 max-h-[380px] overflow-y-auto pr-2">
                        {product.reviews.map((rev) => (
                            <div key={rev._id} className="p-4 bg-white border border-gray-100 rounded-2xl">
                                {/* ... review items ... */}
                                <div className="flex justify-between">
                                    <p className="font-bold text-sm">{rev.name}</p>
                                    <p className="text-amber-500 text-xs">{"★".repeat(rev.rating)}</p>
                                </div>
                                <p className="text-gray-600 text-sm mt-2">"{rev.comment}"</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-400">No reviews yet.</p>
                )}
            </div>
        </div>
    )
}

export default ProductReviewsSection;