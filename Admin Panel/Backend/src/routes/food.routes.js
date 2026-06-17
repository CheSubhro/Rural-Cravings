
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


const router = Router();

// /api/v1/foods
router.route("/")
    .get(getAllFoodItems)
    .post(upload.single("image"), createFoodItem); 

// /api/v1/foods/:foodItemId
router.route("/:foodItemId")
    .get(getFoodItemById)
    .patch(upload.single("image"), updateFoodItem)
    .delete(deleteFoodItem);

router.route("/review").put(verifyJWT, createOrUpdateFoodReview);    

export default router;