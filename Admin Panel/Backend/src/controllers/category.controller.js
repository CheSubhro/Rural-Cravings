
import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import HttpStatus from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Category } from '../models/category.model.js'


const createCategory = asyncHandler ( async (req,res) =>{

    // TODO:
    // Extract and validate category name,description etc from request body
    // Check for potential parentCategory handling (Future Enhancement)
    // Ensure category name doesn't already exist to prevent duplicates
    // Create new category in the database and return the response

    const { name, description, parentCategory, isActive } = req.body;

    if (!name || name.trim() === "") {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Category name is required");
    }

    const existedCategory = await Category.findOne({ name: name.trim() });
    if (existedCategory) {
        throw new ApiError(HttpStatus.CONFLICT, "Category already exists");
    }

    const category = await Category.create({
        name: name.trim(),
        description: description?.trim() || "",
        parentCategory: parentCategory || null,
        isActive: isActive !== undefined ? isActive : true
    });

    if (!category) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong while creating the category");
    }

    return res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse(HttpStatus.CREATED, category, "Category created successfully"));

});

const getAllCategories = asyncHandler(async (req, res) => {

    // TODO:
    // Fetch all categories from the database
    // Serve the category list for both frontend and admin panel views
    // Return a successful API response with the retrieved data
    
    const categories = await Category.find().populate("parentCategory", "name slug");

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, categories, "Categories fetched successfully"));
});

const updateCategory = asyncHandler(async (req, res) => {

    // TODO:
    // Extract category ID from params
    // Extract and validate new category name from request body
    // Check if the category exists in the database
    // Update the category name and save changes

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

    await category.save();

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, category, "Category updated successfully"));

});

const deleteCategory = asyncHandler(async (req, res) => {

    // TODO:
    // Extract category ID from request params
    // Verify if the category exists before attempting deletion
    // Delete the category from the database by its ID
    // Return a success response confirming the deletion

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