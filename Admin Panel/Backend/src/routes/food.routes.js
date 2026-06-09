
import { Router } from "express";
import { 
    createFoodItem, 
    getAllFoodItems, 
    updateFoodItem, 
    deleteFoodItem 
} from "../controllers/food.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; 

const router = Router();

// /api/v1/foods
router.route("/")
    .get(getAllFoodItems)
    .post(upload.single("image"), createFoodItem); 

// /api/v1/foods/:foodItemId
router.route("/:foodItemId")
    .patch(upload.single("image"), updateFoodItem)
    .delete(deleteFoodItem);

export default router;