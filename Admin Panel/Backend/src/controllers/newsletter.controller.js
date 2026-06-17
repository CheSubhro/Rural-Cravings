
import { Newsletter } from "../models/newsletter.model.js";
import { ApiResponse } from "../utils/ApiResponse.js"; 
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const subscribeToNewsletter = asyncHandler(async (req, res) => {

    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email field is required");
    }

    const existingSubscriber = await Newsletter.findOne({ email });

    if (existingSubscriber) {
        throw new ApiError(400, "You have already subscribed to our newsletter! 🎉");
    }

    const subscriber = await Newsletter.create({ email });

    return res
        .status(201)
        .json(new ApiResponse(201, subscriber, "🎉 Thank you for subscribing! Welcome to Rural Cravings."));
});