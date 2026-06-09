
import mongoose, { Schema } from 'mongoose';

// Define the schema for the Category
const categorySchema = new Schema(
    {
        name: { 
            type: String, 
            required: true, 
            unique: true, 
            trim: true 
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        description: { type: String, trim: true },
        isActive: { type: Boolean, default: true },

        // Sub-category handle field
        parentCategory: {
            type: Schema.Types.ObjectId,
            ref: 'Category', 
            default: null     
        }
    },
    // Additional options
    {
        timestamps: true // Adds createdAt and updatedAt fields
    }
);

// For Category Slug
categorySchema.pre('validate', function(next) {
    if (this.name) {
        this.slug = this.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    next();
});

// Create and export the Category model
export const Category = mongoose.model("Category", categorySchema);