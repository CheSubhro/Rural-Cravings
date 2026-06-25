
import { ApiError } from "../utils/ApiError.js";
import HttpStatus from "../utils/HttpStatus.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

// export const verifyAdmin = asyncHandler(async (req, res, next) => {

//     if (!req.user) {
//         return next(new ApiError(HttpStatus.UNAUTHORIZED, "Unauthorized request"));
//     }

//     if (req.user.role !== "Admin" && req.user.role !== "Manager") {
//         return next(new ApiError(403, "Unauthorized access! Only Admin or Manager can view this."));
//     }

//     next();
// });


export const verifyAdmin = asyncHandler(async (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: "Unauthorized request" });
    }

    if (req.user.role !== "Admin" && req.user.role !== "Manager") {
        return res.status(403).json({ success: false, message: "Unauthorized access! Only Admin or Manager can view this." });
    }

    next();
});


