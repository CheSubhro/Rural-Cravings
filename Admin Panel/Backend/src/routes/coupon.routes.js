
import { Router } from "express";
import { 
    createCoupon, 
    validateCoupon, 
    getAllCoupons,
    updateCoupon,
    deleteCoupon 
} from "../controllers/coupon.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/validate").post(verifyJWT, validateCoupon);

router.route("/")
    .post(verifyJWT, verifyAdmin, createCoupon) 
    .get(verifyJWT, verifyAdmin, getAllCoupons); 

router.route("/:id")
    .put(verifyJWT, verifyAdmin, updateCoupon)
    .delete(verifyJWT, verifyAdmin, deleteCoupon);

export default router;