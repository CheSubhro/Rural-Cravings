
import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import HttpStatus from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { Coupon } from '../models/coupon.model.js'

// Create a new coupon (Admin Only)
const createCoupon = asyncHandler(async (req, res) => {

    const { code, discountPercentage, minOrderAmount, expiryDate, isActive } = req.body;

    if (!code || !discountPercentage || !expiryDate) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Code, discount percentage, and expiry date are required");
    }

    const couponExists = await Coupon.findOne({ code: code.toUpperCase() });
    if (couponExists) {
        throw new ApiError(HttpStatus.CONFLICT, "Coupon code already exists");
    }

    const coupon = await Coupon.create({
        code: code.toUpperCase(),
        discountPercentage,
        minOrderAmount: minOrderAmount || 0,
        expiryDate,
        isActive: isActive !== undefined ? isActive : true
    });

    if (!coupon) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong while creating the coupon");
    }

    return res
        .status(HttpStatus.CREATED)
        .json(new ApiResponse(HttpStatus.CREATED, coupon, "Coupon created successfully"));
});

// Validate coupon during checkout (Customer Side)
const validateCoupon = asyncHandler(async (req, res) => {

    const { code, orderAmount } = req.body;

    if (!code || !orderAmount) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Coupon code and order amount are required");
    }

    const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
    if (!coupon) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Invalid or inactive coupon code");
    }

    // Check expiry
    if (new Date() > new Date(coupon.expiryDate)) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "This coupon has expired");
    }

    // Check min order amount
    if (orderAmount < coupon.minOrderAmount) {
        throw new ApiError(HttpStatus.BAD_REQUEST, `Minimum order amount to use this coupon is ${coupon.minOrderAmount}`);
    }

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, {
            discountPercentage: coupon.discountPercentage,
            code: coupon.code
        }, "Coupon applied successfully"));
});

// Get all coupons (Admin Only)
const getAllCoupons = asyncHandler(async (req, res) => {

    const coupons = await Coupon.find().sort({ createdAt: -1 });

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, coupons, "Coupons fetched successfully"));
});

// Update/Edit an existing coupon (Admin Only)
const updateCoupon = asyncHandler(async (req, res) => {

    const { id } = req.params;
    const { code, discountPercentage, minOrderAmount, expiryDate, isActive } = req.body;

    let coupon = await Coupon.findById(id);
    if (!coupon) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Coupon not found");
    }

    if (code && code.toUpperCase() !== coupon.code) {
        const codeExists = await Coupon.findOne({ code: code.toUpperCase() });
        if (codeExists) {
            throw new ApiError(HttpStatus.CONFLICT, "New coupon code already exists");
        }
    }

    const updatedCoupon = await Coupon.findByIdAndUpdate(
        id,
        {
            code: code ? code.toUpperCase() : coupon.code,
            discountPercentage: discountPercentage !== undefined ? discountPercentage : coupon.discountPercentage,
            minOrderAmount: minOrderAmount !== undefined ? minOrderAmount : coupon.minOrderAmount,
            expiryDate: expiryDate || coupon.expiryDate,
            isActive: isActive !== undefined ? isActive : coupon.isActive
        },
        { new: true, runValidators: true }
    );

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, updatedCoupon, "Coupon updated successfully"));
});

//  Delete a coupon (Admin Only)
const deleteCoupon = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const coupon = await Coupon.findById(id);
    if (!coupon) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Coupon not found");
    }

    await Coupon.findByIdAndDelete(id);

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, null, "Coupon deleted successfully"));
});

export {
    createCoupon,
    validateCoupon,
    getAllCoupons,
    updateCoupon,
    deleteCoupon
};