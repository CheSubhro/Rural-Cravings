
import React, { useState } from 'react';
import { IconStarFilled, IconLoader2, IconCircleCheck } from '@tabler/icons-react';
import { toast } from 'react-toastify';
import api from '../../services/api';

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
            if (onReviewSubmit) onReviewSubmit();
        } catch (error) {
            console.error("Review submit error:", error);
            const errorMsg = error.response?.data?.message || "Please login to submit a review!";
            toast.error(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
            <div className="lg:col-span-1">
                <h3 className="text-lg font-bold mb-4">Write a Review</h3>
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="mb-4">
                        <label className="block text-sm font-semibold mb-2">Select Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((s) => (
                                <button key={s} type="button" onClick={() => setRating(s)} className="cursor-pointer">
                                    <IconStarFilled size={24} className={s <= rating ? "text-amber-500" : "text-gray-300"} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <textarea
                        rows="4"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts..."
                        className="w-full p-3 border border-gray-200 rounded-xl text-sm mb-4"
                    />
                    <button
                        onClick={handleReviewSubmit}
                        disabled={isSubmitting}
                        className="w-full py-3 bg-emerald-600 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? <><IconLoader2 className="animate-spin" size={18} /> Submitting...</> : 'Submit Review'}
                    </button>
                </div>
            </div>

            <div className="lg:col-span-2">
                <div className="flex flex-col md:flex-row gap-8">

                    <div className="flex-1 space-y-4">
                        <h3 className="text-lg font-bold">Customer Feedback ({product.reviews?.length || 0})</h3>
                        {product.reviews?.map((rev) => (
                            <div key={rev._id} className="p-4 bg-white border border-gray-100 rounded-2xl">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-sm">{rev.name}</p>
                                    <span className="flex items-center text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-bold">
                                        <IconCircleCheck size={12} className="mr-1" /> Verified
                                    </span>
                                </div>
                                <p className="text-amber-500 text-xs">{"★".repeat(rev.rating)}</p>
                                <p className="text-gray-600 text-sm mt-2">"{rev.comment}"</p>
                            </div>
                        ))}
                    </div>

                    <div className="w-full md:w-64 shrink-0">
                        <h3 className="text-lg font-bold mb-4">Summary</h3>
                        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                            <span className="text-4xl font-black">4.5</span>
                            <div className="text-amber-500 mb-4">★★★★★</div>
                            <div className="space-y-1">
                                {[5, 4, 3, 2, 1].map((s) => (
                                    <div key={s} className="flex items-center gap-2 text-xs">
                                        <span className="w-12 font-semibold">{s} Star</span>
                                        <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-emerald-500" style={{ width: s >= 4 ? '50%' : '0%' }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductReviewsSection;