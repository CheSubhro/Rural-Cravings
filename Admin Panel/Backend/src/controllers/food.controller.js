
import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import HttpStatus from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Category } from '../models/category.model.js'
import { FoodItem } from '../models/food.model.js'
import { uploadOnCloudinary } from '../utils/Cloudinary.js'


const createFoodItem = asyncHandler(async (req, res) => {

    // TODO:
    // Extract and validate required fields (name, price, category) from request body
    // Check if the provided Category ID exists in the database
    // Check for a local image file path provided by Multer
    // Upload the food item image to Cloudinary
    // Create a new food item document (slug will auto-generate)
    // Return a successful CREATED response with the food item data

    const { name, description, price, discountPrice, category, stock, isAvailable } = req.body;

    // Basic fields validation
    if ([name, price, category].some((field) => !field || field.toString().trim() === "")) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Name, price and category fields are required");
    }

    // Verify if the Category actually exists in the database
    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
        throw new ApiError(HttpStatus.NOT_FOUND, "The assigned category does not exist");
    }

    // Optional: Prevent duplicate food item names to avoid slug collision crash
    const duplicateFood = await FoodItem.findOne({ name: name.trim() });
    if (duplicateFood) {
        throw new ApiError(HttpStatus.CONFLICT, "A food item with this name already exists");
    }

    // Check for local image file (comes via Multer)
    const imageLocalPath = req.file?.path;
    if (!imageLocalPath) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Food item image is required");
    }

    // Upload image to Cloudinary
    const uploadedImage = await uploadOnCloudinary(imageLocalPath);
    if (!uploadedImage) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload food image");
    }

    // Create database entry
    const foodItem = await FoodItem.create({
        name: name.trim(),
        description: description?.trim() || "",
        price: Number(price),
        discountPrice: discountPrice ? Number(discountPrice) : 0,
        category, // Frontend passing valid Category _id
        stock: stock ? Number(stock) : 10,
        image: uploadedImage.url,
        isAvailable: isAvailable !== undefined ? isAvailable : true
    });

    if (!foodItem) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong while creating the food item");
    }

    return res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse(HttpStatus.CREATED, foodItem, "Food item created successfully"));   
});

const getAllFoodItems = asyncHandler(async (req, res) => {

    // TODO:
    // Fetch all food items from the database
    // Populate the category details instead of just returning the ID
    // Return a successful response with the fetched food items
    
    const foodItems = await FoodItem.find().populate("category");

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, foodItems, "Food items fetched successfully"));
});

const getFoodItemById = asyncHandler(async (req, res) => {

    const { foodItemId } = req.params;

    const foodItem = await FoodItem.findById(foodItemId).populate("category");

    if (!foodItem) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Food item not found");
    }

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, foodItem, "Food item fetched successfully"));
});

const updateFoodItem = asyncHandler(async (req, res) => {

    // TODO:
    // Extract food item ID from request params and data from request body
    // Verify if the food item exists in the database
    // Validate the assigned category if it is being updated
    // Handle new image upload to Cloudinary if a new file is provided
    // Update the food item details and return the updated document 

    const { foodItemId } = req.params;
    const { name, description, price, discountPrice, category, stock, isAvailable } = req.body;

    // Check if the food item exists in the database
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Food item not found");
    }

    // If category is provided, verify if the new category ID is valid
    if (category) {
        const existingCategory = await Category.findById(category);
        if (!existingCategory) {
            throw new ApiError(HttpStatus.NOT_FOUND, "The assigned category does not exist");
        }
        foodItem.category = category;
    }

    // Image update logic (if a new image file is uploaded)
    if (req.file?.path) {
        const imageLocalPath = req.file.path;
        const uploadedImage = await uploadOnCloudinary(imageLocalPath);
        
        if (!uploadedImage) {
            throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload new food image");
        }
        
        // Set the new image URL
        foodItem.image = uploadedImage.url;
    }

    // Update the remaining fields if they are sent in the request body
    if (name) foodItem.name = name.trim();
    if (description !== undefined) foodItem.description = description.trim();
    if (price) foodItem.price = Number(price);
    if (discountPrice !== undefined) foodItem.discountPrice = Number(discountPrice);
    if (stock !== undefined) foodItem.stock = Number(stock);
    if (isAvailable !== undefined) foodItem.isAvailable = isAvailable;

    // Save to the database (this will trigger the pre 'validate' hook and auto-update the slug)
    await foodItem.save();

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, foodItem, "Food item updated successfully"));

});

const deleteFoodItem = asyncHandler(async (req, res) => {

    // TODO:
    // Extract food item ID from request params
    // Verify if the food item exists in the database
    // Delete the food item from the database
    // Return a successful deletion response

    const { foodItemId } = req.params;

    // Check if the food item exists
    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Food item not found");
    }

    // Delete the food item by its ID
    await FoodItem.findByIdAndDelete(foodItemId);

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, {}, "Food item deleted successfully"));
});

const createOrUpdateFoodReview = asyncHandler(async (req, res) => {
    
    const { rating, comment, foodItemId } = req.body;

    if (!rating || !comment || !foodItemId) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Rating, comment and foodItemId are required");
    }

    if (!req.user) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Customer authentication failed. Please login again.");
    }

    const foodItem = await FoodItem.findById(foodItemId);
    if (!foodItem) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Food item not found");
    }

    const customerId = req.user._id; 
    const customerName = req.user.name || "Anonymous Foodie"; 

    const isReviewed = foodItem.reviews.find(
        (rev) => rev.customer.toString() === customerId.toString()
    );

    if (isReviewed) {
        foodItem.reviews.forEach((rev) => {
            if (rev.customer.toString() === customerId.toString()) {
                rev.rating = Number(rating);
                rev.comment = comment;
                rev.name = customerName;
            }
        });
    } else {
        foodItem.reviews.push({
            customer: customerId,
            name: customerName, 
            rating: Number(rating),
            comment
        });
    }

    foodItem.numOfReviews = foodItem.reviews.length;
    const totalRatingSum = foodItem.reviews.reduce((acc, item) => item.rating + acc, 0);
    foodItem.ratings = totalRatingSum / foodItem.reviews.length;

    await foodItem.save({ validateBeforeSave: false });

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, foodItem, "Review submitted successfully"));
});

export {
    createFoodItem,
    getAllFoodItems,
    getFoodItemById,
    updateFoodItem,
    deleteFoodItem,
    createOrUpdateFoodReview
};