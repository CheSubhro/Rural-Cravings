
import { asyncHandler } from '../utils/AsyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import HttpStatus from '../utils/HttpStatus.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { Customer } from '../models/customer.model.js';
import { generateCustomerTokens } from "../utils/TokenManager.js";

const registerCustomer = asyncHandler(async (req, res) => {

    // TODO:
    // Get customer details from request body (name, email, username, password, phone)
    // Validate inputs - check for empty fields
    // Check if customer already exists using email or username
    // Create customer object - create entry in database
    // Remove password and refreshToken field from response
    // Check for customer creation success
    // Return response

    const { name, email, username, password, phone } = req.body;

    // Validation
    if ([name, email, username, password].some((field) => !field || field.trim() === "")) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Name, email, username, and password are required");
    }

    // Check if customer already exists
    const existedCustomer = await Customer.findOne({
        $or: [{ username }, { email }]
    });

    if (existedCustomer) {
        throw new ApiError(HttpStatus.CONFLICT, "Customer with email or username already exists");
    }

    // Create customer entry
    const customer = await Customer.create({
        name,
        email,
        username,
        password,
        phone: phone || ""
    });

    // Remove password and refreshToken from response
    const createdCustomer = await Customer.findById(customer._id).select(
        "-password -refreshToken"
    );

    if (!createdCustomer) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong while registering the customer");
    }

    return res.status(HttpStatus.CREATED).json(
        new ApiResponse(HttpStatus.CREATED, createdCustomer, "Customer registered successfully")
    );


});

const loginCustomer = asyncHandler(async (req, res) => {


    // TODO:
    // Get email and password from request body
    // Validate user existence
    // Verify password using schema method
    // Generate Access and Refresh tokens
    // Set cookie options for security
    // Return response with tokens and customer data

    const { email, password } = req.body;

    if (!email || !password) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Email and password are required");
    }

    const customer = await Customer.findOne({ email });

    if (!customer) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Customer does not exist");
    }

    const isPasswordValid = await customer.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid user credentials");
    }

    // Function to generate tokens (Assuming you have these defined elsewhere)
    const { accessToken, refreshToken } = await generateCustomerTokens(customer._id);

    const loggedInCustomer = await Customer.findById(customer._id).select(
        "-password -refreshToken"
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(HttpStatus.OK)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                HttpStatus.OK,
                {
                    customer: loggedInCustomer,
                    accessToken,
                    refreshToken
                },
                "Customer logged in successfully"
            )
        );
});

const logoutCustomer = asyncHandler(async (req, res) => {

    await Customer.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

    const options = { httpOnly: true, secure: true };
    return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, {}, "Customer logged out"));
});

const getCurrentCustomer = asyncHandler(async (req, res) => {
    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, req.user, "Customer details fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { name, phone } = req.body;

    if (!name && !phone) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Name or phone is required");
    }

    const customer = await Customer.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                name: name || req.user.name,
                phone: phone || req.user.phone
            }
        },
        { new: true }
    ).select("-password -refreshToken");

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, customer, "Account details updated successfully"));
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const customer = await Customer.findById(req.user?._id);
    const isPasswordValid = await customer.isPasswordCorrect(oldPassword);

    if (!isPasswordValid) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid old password");
    }

    customer.password = newPassword;
    await customer.save({ validateBeforeSave: false });

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, {}, "Password changed successfully"));
});

const getAllCustomersForAdmin = asyncHandler(async (req, res) => {
    const customers = await Customer.find()
        .select("-password -refreshToken")
        .sort({ createdAt: -1 });

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, customers, "All customers fetched successfully for admin"));
});

const deleteCustomerByAdmin = asyncHandler(async (req, res) => {

    const { customerId } = req.params;

    const customer = await Customer.findByIdAndDelete(customerId);

    if (!customer) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Customer not found");
    }

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, {}, "Customer account deleted successfully by admin"));
});


export {
    registerCustomer,
    loginCustomer,
    logoutCustomer,
    getCurrentCustomer,
    updateAccountDetails,
    changeCurrentPassword,
    getAllCustomersForAdmin,
    deleteCustomerByAdmin
};



