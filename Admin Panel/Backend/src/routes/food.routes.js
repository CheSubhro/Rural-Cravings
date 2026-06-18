
import { Router } from "express";
import { 
    createFoodItem, 
    getAllFoodItems,
    getFoodItemById, 
    updateFoodItem, 
    deleteFoodItem,
    createOrUpdateFoodReview ,
    getReviewsByFoodId,
    getFeaturedReviews
} from "../controllers/food.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; 
import { verifyJWT } from "../middlewares/auth.middleware.js"; 
import { verifyAdmin } from "../middlewares/admin.middleware.js";


const router = Router();

router.route("/featured-reviews").get(getFeaturedReviews);
router.route("/review").put(verifyJWT,createOrUpdateFoodReview); 
router.route("/reviews/:foodItemId").get(getReviewsByFoodId); 

// /api/v1/foods
router.route("/")
    .get(getAllFoodItems)
    .post(verifyJWT, verifyAdmin, upload.single("image"), createFoodItem);

// /api/v1/foods/:foodItemId
router.route("/:foodItemId")
    .get(getFoodItemById)
    .patch(verifyJWT, verifyAdmin, upload.single("image"), updateFoodItem) 
    .delete(verifyJWT, verifyAdmin, deleteFoodItem);

  


export default router;