
import { Router } from "express";
import { 
    placeOrder, 
    verifyRazorpayPayment,
    getAllOrders, 
    updateOrderStatus ,
    getRiderOrders,         
    updateDeliveryStatus,
    getCustomerOrders
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { checkShopStatus } from "../middlewares/shopStatus.middleware.js";

const router = Router();


router.route("/place").post(verifyJWT, checkShopStatus, placeOrder);

router.route("/verify-payment").post(verifyJWT, verifyRazorpayPayment);

router.route("/customer/my-orders").get(verifyJWT, getCustomerOrders);

router.route("/rider/my-orders").get(verifyJWT, getRiderOrders);
router.route("/rider/:orderId/delivery").patch(verifyJWT, updateDeliveryStatus);

router.route("/all").get(verifyJWT, verifyAdmin, getAllOrders); 
router.route("/:orderId").patch(verifyJWT, verifyAdmin, updateOrderStatus);

export default router;