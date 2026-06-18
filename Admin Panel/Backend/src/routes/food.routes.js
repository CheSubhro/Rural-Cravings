
import { Router } from "express";
import { 
    createFoodItem, 
    getAllFoodItems,
    getFoodItemById, 
    updateFoodItem, 
    deleteFoodItem,
    createOrUpdateFoodReview 
} from "../controllers/food.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; 
import { verifyJWT } from "../middlewares/auth.middleware.js"; 
import { verifyAdmin } from "../middlewares/admin.middleware.js";


const router = Router();

// /api/v1/foods
router.route("/")
    .get(getAllFoodItems)
    .post(verifyJWT, verifyAdmin, upload.single("image"), createFoodItem);

// /api/v1/foods/:foodItemId
router.route("/:foodItemId")
    .get(getFoodItemById)
    .patch(verifyJWT, verifyAdmin, upload.single("image"), updateFoodItem) 
    .delete(verifyJWT, verifyAdmin, deleteFoodItem);

router.route("/review").put(verifyJWT,createOrUpdateFoodReview);    

export default router;