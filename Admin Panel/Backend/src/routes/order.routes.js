
import { Router } from "express";
import { 
    placeOrder, 
    getAllOrders, 
    updateOrderStatus ,
    getRiderOrders,         
    updateDeliveryStatus
} from "../controllers/order.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();


router.route("/").post(verifyJWT, placeOrder);

router.route("/rider/my-orders").get(verifyJWT, getRiderOrders);
router.route("/rider/:orderId/delivery").patch(verifyJWT, updateDeliveryStatus);

router.route("/all").get(verifyJWT, verifyAdmin, getAllOrders); 
router.route("/:orderId").patch(verifyJWT, verifyAdmin, updateOrderStatus);

export default router;