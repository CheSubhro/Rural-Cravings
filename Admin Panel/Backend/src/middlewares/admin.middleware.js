
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const verifyAdmin = asyncHandler(async (req, res, next) => {

    
    if (!req.user) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Unauthorized request");
    }

    if (req.user.role !== 'Admin') {
        throw new ApiError(HttpStatus.FORBIDDEN, "Access denied! Only admins can perform this action");
    }

    next();
});