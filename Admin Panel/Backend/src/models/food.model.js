

import mongoose, { Schema } from 'mongoose';

// Define the schema for the FoodItem
const foodItemSchema = new Schema(
    {
        name: { 
            type: String, 
            required: true, 
            trim: true 
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        description: {
            type: String,
            trim: true
        },
        price: { 
            type: Number, 
            required: true,
            min: 0
        },
        discountPrice: {
            type: Number,
            default: 0, 
            min: 0
        },
        image: { 
            type: String, 
            required: true // Cloudinary URL image path 
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category", // Category model relational link
            required: true
        },
        stock: {
            type: Number,
            default: 10, 
            min: 0
        },
        isAvailable: { 
            type: Boolean, 
            default: true 
        },
        ratings: {
            type: Number,
            default: 0 
        },
        numOfReviews: {
            type: Number,
            default: 0
        },
        reviews: [
            {
                customer: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Customer", 
                    required: true
                },
                name: {
                    type: String,
                    required: true 
                },
                rating: {
                    type: Number,
                    required: true,
                    min: 1,
                    max: 5
                },
                comment: {
                    type: String,
                    required: true
                },
                createdAt: {
                    type: Date,
                    default: Date.now
                }
            }
        ]
    },
    // Additional options
    {
        timestamps: true // Adds createdAt and updatedAt fields
    }
);

// FoodItem Slug auto-generation logic
foodItemSchema.pre('validate', function(next) {
    if (this.name) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    next();
});


// Create and export the FoodItem model
export const FoodItem = mongoose.model("FoodItem", foodItemSchema);