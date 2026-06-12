
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Settings } from "../models/settings.model.js";
import HttpStatus from "../utils/HttpStatus.js";

const getSettings = asyncHandler(async (req, res) => {

    let settings = await Settings.findOne();

    if (!settings) {
        settings = await Settings.create({});
    }

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, settings, "Settings fetched successfully"));
});

const updateSettings = asyncHandler(async (req, res) => {
    
    const { 
        deliveryChargeInside, 
        deliveryChargeOutside, 
        minimumOrderAmount, 
        isShopOpen, 
        isMaintenanceMode 
    } = req.body;

    const updatedSettings = await Settings.findOneAndUpdate(
        {},
        {
            $set: {
                deliveryChargeInside,
                deliveryChargeOutside,
                minimumOrderAmount,
                isShopOpen,
                isMaintenanceMode
            }
        },
        { 
            new: true, 
            runValidators: true,
            upsert: true 
        }
    );

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, updatedSettings, "Settings updated successfully"));
});

export {
    getSettings,
    updateSettings
};