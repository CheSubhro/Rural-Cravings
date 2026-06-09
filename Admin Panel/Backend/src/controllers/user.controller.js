
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

    // TODO:
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    // Get user details from frontend
    const { fullName, email, username, password, role } = req.body;

    // Validation - not empty
    if ([fullName, email, username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "All fields are required");
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
        password,
        username: lowercaseUsername,
        role: role || "Staff" 
    });

    // Remove sensitive fields
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    if (!createdUser) {
        throw new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, "Something went wrong while registering the user");
    }

    // Return response
    return res.status(HttpStatus.CREATED).json(
        new ApiResponse(HttpStatus.CREATED, createdUser, "User registered successfully")
    );


})

const loginUser = asyncHandler(async (req, res) => {

    // TODO:
    // Get email/username and password
    // Find user 
    // Verify password
    // Generate tokens 

    // Get email/username and password
    const { email, username, password } = req.body;

    if (!username && !email) {
        throw new ApiError(HttpStatus.BAD_REQUEST, "Username or email is required");
    }

    //  Find user
    const user = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (!user) {
        throw new ApiError(HttpStatus.NOT_FOUND, "User does not exist");
    }

    // Verify password 
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Invalid user credentials");
    }

    // Generate tokens 
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
                {
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User logged in successfully"
            )
        );
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(HttpStatus.OK)
        .json(new ApiResponse(HttpStatus.OK, req.user, "User fetched successfully"));
});

const logoutUser = asyncHandler(async (req, res) => {

    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 
            }
        },
        {
            new: true
        }
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
    logoutUser
}


