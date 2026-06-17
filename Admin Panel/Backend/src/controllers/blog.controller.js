
import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import HttpStatus from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Blog } from '../models/blog.model.js' 
import { uploadOnCloudinary } from '../utils/Cloudinary.js' 

const createBlog = asyncHandler(async (req, res) => {
    
    const { title, content, excerpt, status } = req.body;

    const authorId = req.user?._id || req.body.author;

    if (!title || title.trim() === "") {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Blog title is required");
    }
    if (!content || content.trim() === "") {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Blog content is required");
    }
    if (!authorId) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Author information is required");
    }

    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Blog feature image is required");
    }

    const uploadedImage = await uploadOnCloudinary(imageLocalPath);
    if (!uploadedImage) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload blog image to Cloudinary");
    }

    const blog = await Blog.create({
        title: title.trim(),
        content: content.trim(),
        excerpt: excerpt?.trim() || "",
        author: authorId,
        status: status || 'published',
        image: uploadedImage.url
    });

    if (!blog) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong while creating the blog");
    }

    return res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse(HttpStatus.CREATED, blog, "Blog created successfully"));
});

const getAllBlogs = asyncHandler(async (req, res) => {
    const blogs = await Blog.find().populate("author", "fullName username email avatar");

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, blogs, "Blogs fetched successfully"));
});

const getBlogById = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId).populate("author", "fullName username email avatar");
    if (!blog) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Blog not found");
    }

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, blog, "Blog details fetched successfully"));
});

const updateBlog = asyncHandler(async (req, res) => {
    
    const { blogId } = req.params;
    const { title, content, excerpt, status } = req.body;

    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Blog not found");
    }

    if (title && title.trim() !== "") blog.title = title.trim();
    if (content !== undefined) blog.content = content.trim();
    if (excerpt !== undefined) blog.excerpt = excerpt.trim();
    if (status !== undefined) blog.status = status;

    if (req.file?.path) {
        const imageLocalPath = req.file.path;
        const uploadedImage = await uploadOnCloudinary(imageLocalPath);
        
        if (!uploadedImage) {
            throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload new blog image to Cloudinary");
        }
        
        blog.image = uploadedImage.url;
    }

    await blog.save();

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, blog, "Blog updated successfully"));
});

const deleteBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Blog not found");
    }

    await Blog.findByIdAndDelete(blogId);

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, {}, "Blog deleted successfully"));
});

export {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
};