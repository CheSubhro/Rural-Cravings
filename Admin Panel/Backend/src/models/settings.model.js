
import mongoose, { Schema } from "mongoose";

const settingsSchema = new Schema(
    {
        deliveryChargeInside: {
            type: Number,
            required: [true, "Delivery charge inside this area is required"],
            default: 60
        },
        deliveryChargeOutside: {
            type: Number,
            required: [true, "Delivery charge outside this area is required"],
            default: 120
        },
        minimumOrderAmount: {
            type: Number,
            required: [true, "Minimum order amount is required"],
            default: 200
        },
        isShopOpen: {
            type: Boolean,
            default: true
        },
        isMaintenanceMode: {
            type: Boolean,
            default: false
        },
        
    },
    { 
        timestamps: true 
    }
);

export const Settings = mongoose.model("Settings", settingsSchema);