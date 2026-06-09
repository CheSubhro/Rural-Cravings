
import { Router } from "express";
import { 
    registerCustomer, 
    loginCustomer,
    logoutCustomer,
    getCurrentCustomer ,
    updateAccountDetails, 
    changeCurrentPassword
} from "../controllers/customer.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.route("/register").post(registerCustomer);
router.route("/login").post(loginCustomer);

// Secured routes
router.route("/logout").post(verifyJWT, logoutCustomer);
router.route("/current-customer").get(verifyJWT, getCurrentCustomer);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/change-password").post(verifyJWT, changeCurrentPassword); 

export default router;