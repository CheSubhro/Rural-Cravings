
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Settings } from "../models/settings.model.js";
import HttpStatus from "../utils/HttpStatus.js";

export const checkShopStatus = asyncHandler(async (req, res, next) => {
    
    let settings = await Settings.findOne();

    if (!settings) {
        settings = await Settings.create({});
    }

    if (settings.isMaintenanceMode) {
        throw new ApiError(
            HttpStatus.SERVICE_UNAVAILABLE, 
            "The system is currently undergoing maintenance. Please try again later."
        );
    }

    if (!settings.isShopOpen) {
        throw new ApiError(
            HttpStatus.FORBIDDEN, 
            "We are currently closed and not accepting new orders at this moment."
        );
    }

    next();
});