
import { Router } from "express";
import { 
    registerCustomer, 
    loginCustomer,
    logoutCustomer,
    getCurrentCustomer ,
    updateAccountDetails, 
    changeCurrentPassword,
    getAllCustomersForAdmin, 
    deleteCustomerByAdmin
} from "../controllers/customer.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

// Public routes
router.route("/register").post(registerCustomer);
router.route("/login").post(loginCustomer);

// Secured routes
router.route("/logout").post(verifyJWT, logoutCustomer);
router.route("/current-customer").get(verifyJWT, getCurrentCustomer);
router.route("/update-account").patch(verifyJWT, updateAccountDetails);
router.route("/change-password").post(verifyJWT, changeCurrentPassword); 

// Only Admin show this 
router.route("/admin/all-customers").get(verifyJWT, verifyAdmin, getAllCustomersForAdmin);
router.route("/admin/delete/:customerId").delete(verifyJWT, verifyAdmin, deleteCustomerByAdmin);

export default router;