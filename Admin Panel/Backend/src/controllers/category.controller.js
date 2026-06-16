
import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import HttpStatus from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Category } from '../models/category.model.js'
import { uploadOnCloudinary } from '../utils/Cloudinary.js' 

const createCategory = asyncHandler ( async (req,res) =>{

    const { name, description, parentCategory, isActive } = req.body;

    if (!name || name.trim() === "") {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Category name is required");
    }

    const existedCategory = await Category.findOne({ name: name.trim() });
    if (existedCategory) {
        throw new ApiError(HttpStatus.CONFLICT, "Category already exists");
    }

    const imageLocalPath = req.file?.path;
    let uploadedImage = null;

    if (imageLocalPath) {
        uploadedImage = await uploadOnCloudinary(imageLocalPath);
        if (!uploadedImage) {
            throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload category image to Cloudinary");
        }
    }

    const category = await Category.create({
        name: name.trim(),
        description: description?.trim() || "",
        parentCategory: parentCategory || null,
        isActive: isActive !== undefined ? isActive : true,
        image: uploadedImage ? uploadedImage.url : undefined 
    });

    if (!category) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong while creating the category");
    }

    return res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse(HttpStatus.CREATED, category, "Category created successfully"));
});

const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find().populate("parentCategory", "name slug");

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, categories, "Categories fetched successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;
    const { name, description, parentCategory, isActive } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Category not found");
    }

    if (name && name.trim() !== "") {
        category.name = name.trim();
    }
    
    if (description !== undefined) category.description = description.trim();
    if (parentCategory !== undefined) category.parentCategory = parentCategory || null;
    if (isActive !== undefined) category.isActive = isActive;

    if (req.file?.path) {
        const imageLocalPath = req.file.path;
        const uploadedImage = await uploadOnCloudinary(imageLocalPath);
        
        if (!uploadedImage) {
            throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload new category image to Cloudinary");
        }
        
        category.image = uploadedImage.url;
    }

    await category.save();

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, category, "Category updated successfully"));
});

const deleteCategory = asyncHandler(async (req, res) => {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    if (!category) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Category not found");
    }

    await Category.findByIdAndDelete(categoryId);

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, {}, "Category deleted successfully"));
});

export {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
};