
import { Router } from "express";
import { 
    createCategory, 
    getAllCategories, 
    updateCategory, 
    deleteCategory 
} from "../controllers/category.controller.js";
import { upload } from "../middlewares/multer.middleware.js"; 

const router = Router();

router.route("/")
    .get(getAllCategories)
    .post(upload.single("image"), createCategory); 

router.route("/:categoryId")
    .patch(upload.single("image"), updateCategory) 
    .delete(deleteCategory);

export default router;