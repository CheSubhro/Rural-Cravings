
import mongoose, { Schema } from 'mongoose';

const blogSchema = new  Schema(
    {
        title: {
            type: String,
            required: [true, 'Blog title is required'],
            trim: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        content: {
            type: String,
            required: [true, 'Blog content is required']
        },
        excerpt: {
            type: String,
            trim: true
        },
        image: { 
            type: String,
            required: true 
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'published'
        }
    }, 
    { 
        timestamps: true
    }
);

// For Blog Slug
blogSchema.pre('validate', function(next) {
    if (this.title) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
    next();
});

// Create and export the Blog model
export const Blog = mongoose.model("Blog", blogSchema);

