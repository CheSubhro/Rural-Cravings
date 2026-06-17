
import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
    {
        name: { type: String, required: true },
        comment: { type: String, required: true },
        image: { type: String, default: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&q=80" },
        rating: { type: Number, default: 5 }
    },
    { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);