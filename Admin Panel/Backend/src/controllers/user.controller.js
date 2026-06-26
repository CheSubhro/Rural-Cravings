
import { asyncHandler } from '../utils/AsyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import HttpStatus from '../utils/HttpStatus.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { User } from '../models/user.model.js'
import { uploadOnCloudinary }  from '../utils/Cloudinary.js'
import { lowercase } from '../utils/StringUtils.js'
import { generateUserTokens } from "../utils/TokenManager.js";
import bcrypt from "bcrypt";

const registerUser = asyncHandler ( async (req,res) =>{
    // Get user details from frontend
    const { fullName, email, username, password, role } = req.body;

    // Validation - not empty
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "All fields are required");
    }

    const validRoles = ['Admin', 'Manager', 'Staff', 'Delivery'];
    if (role && !validRoles.includes(role)) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Invalid role assignment");
    }

    // Check if user already exists
    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw new ApiError(HttpStatus.CONFLICT, "User with email or username already exists");
    }

    // Convert username to lowercase
    const lowercaseUsername = lowercase(username);

    // Check for images (Avatar)
    const avatarLocalPath = req.files && req.files.avatar && req.files.avatar[0] ? req.files.avatar[0].path : null;
    
    if (!avatarLocalPath) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Avatar file is required");
    }

    // Upload to Cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    if (!avatar) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Failed to upload avatar to Cloudinary");
    }

    // Optional Cover Image
    let coverImageLocalPath = null;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path;
    }
    
    let coverImage;
    if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath);
    }

    // Create user object in DB
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password, // Pre-save hook automatically hashes this safely
        username: lowercaseUsername,
        role: role || "Staff" 
    });

    // Remove sensitive fields
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong while registering the user");
    }

    return res.status(HttpStatus.CREATED).json(
        new ApiResponse(HttpStatus.CREATED, createdUser, "User registered successfully")
    );
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;

    if (!username && !email) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Username or email is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND, "User does not exist");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateUserTokens(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

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
                { user: loggedInUser, accessToken, refreshToken },
                "User logged in successfully"
            )
        );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, req.user, "User fetched successfully"));
});

const getAllStaffs = asyncHandler(async (req, res) => {
    // --- OPTIMIZED: Delivery profile data tracking integrated ---
    const staffs = await User.find({
        role: { $in: ['Manager', 'Staff', 'Delivery'] }
    }).select("-password -refreshToken");

    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, staffs, "Staff directory fetched successfully"));
});

const updateStaff = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { fullName, email, username, password, role } = req.body;

    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND, "Staff member not found");
    }

    const updateData = {};

    if (fullName) updateData.fullName = fullName;
    if (role) {
        const validRoles = ['Admin', 'Manager', 'Staff', 'Delivery'];
        if (!validRoles.includes(role)) throw new ApiError(HttpStatus.BAD_REQUEST, "Invalid role configuration");
        updateData.role = role;
    }
    
    if (email) {
        const emailExists = await User.findOne({ email, _id: { $ne: id } });
        if (emailExists) throw new ApiError(HttpStatus.CONFLICT, "Email is already taken");
        updateData.email = email.trim();
    }

    if (username) {
        const usernameExists = await User.findOne({ username: username.toLowerCase(), _id: { $ne: id } });
        if (usernameExists) throw new ApiError(HttpStatus.CONFLICT, "Username is already taken");
        updateData.username = username.toLowerCase().trim();
    }

    if (password && password.trim() !== "") {
        updateData.password = await bcrypt.hash(password, 10);
    }

    if (req.files) {
        if (req.files.avatar && req.files.avatar[0]) {
            const avatarLocalPath = req.files.avatar[0].path;
            const uploadedAvatar = await uploadOnCloudinary(avatarLocalPath);
            if (uploadedAvatar) {
                updateData.avatar = uploadedAvatar.url;
            }
        }

        if (req.files.coverImage && req.files.coverImage[0]) {
            const coverImageLocalPath = req.files.coverImage[0].path;
            const uploadedCover = await uploadOnCloudinary(coverImageLocalPath);
            if (uploadedCover) {
                updateData.coverImage = uploadedCover.url;
            }
        }
    }

    const updatedUser = await User.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    ).select("-password -refreshToken");

    return res.status(HttpStatus.OK).json(
        new ApiResponse(HttpStatus.OK, updatedUser, "Staff profile updated successfully")
    );
});

const deleteStaff = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) throw new ApiError(HttpStatus.NOT_FOUND, "Staff member not found");
    
    return res.status(HttpStatus.OK).json(new ApiResponse(HttpStatus.OK, {}, "Staff removed successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        { $unset: { refreshToken: 1 } },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true
    };

    return res
        .status(HttpStatus.OK)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(HttpStatus.OK, {}, "User logged out successfully"));
});

export {
    registerUser,
    loginUser,
    getCurrentUser,
    getAllStaffs,
    updateStaff,
    deleteStaff,
    logoutUser
}