
import mongoose, { Schema } from "mongoose";

const couponSchema = new Schema(
    {
        code: {
            type: String,
            required: [true, 'Please enter a coupon code'],
            unique: true,
            trim: true,
            uppercase: true, 
        },
        discountPercentage: {
            type: Number,
            required: [true, 'Please enter discount percentage'],
            min: [1, 'Discount must be at least 1%'],
            max: [100, 'Discount cannot exceed 100%'],
        },
        minOrderAmount: {
            type: Number,
            default: 0, 
        },
        expiryDate: {
            type: Date,
            required: [true, 'Please enter expiry date'],
        },
        isActive: {
            type: Boolean,
            default: true, 
        }
    },
    { timestamps: true }
);

export const Coupon = mongoose.model("Coupon", couponSchema);