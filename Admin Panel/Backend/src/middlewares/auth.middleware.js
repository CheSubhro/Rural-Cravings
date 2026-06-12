
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import { Customer } from "../models/customer.model.js";
import { User } from "../models/user.model.js";
import HttpStatus from "../utils/HttpStatus.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {

    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return next(new ApiError(HttpStatus.UNAUTHORIZED, "Unauthorized request"));
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        let user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        
        if (!user) {
            user = await Customer.findById(decodedToken?._id).select("-password -refreshToken");
        }

        if (!user) {
            return next(new ApiError(HttpStatus.UNAUTHORIZED, "Invalid Access Token"));
        }

        req.user = user; 
        next();
    } catch (error) {
        return next(new ApiError(HttpStatus.UNAUTHORIZED, error?.message || "Invalid access token"));
    }
});