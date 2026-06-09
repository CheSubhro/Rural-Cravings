
import { Router } from "express";
import { 
    createCategory, 
    getAllCategories, 
    updateCategory, 
    deleteCategory 
} from "../controllers/category.controller.js";

const router = Router();

router.route("/")
    .get(getAllCategories)
    .post(createCategory);

router.route("/:categoryId")
    .patch(updateCategory)
    .delete(deleteCategory);

export default router;