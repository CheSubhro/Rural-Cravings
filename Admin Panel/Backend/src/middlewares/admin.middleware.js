
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

export const verifyAdmin = asyncHandler(async (req, res, next) => {

    
    if (!req.user) {
        throw new ApiError(HttpStatus.UNAUTHORIZED, "Unauthorized request");
    }

    if (req.user.role !== "Admin" && req.user.role !== "Manager") {
        throw new ApiError(403, "Unauthorized access! Only Admin or Manager can view this.");
    }

    next();
});