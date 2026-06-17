
import { Router } from "express";
import { 
    createBlog, 
    getAllBlogs, 
    getBlogById, 
    updateBlog, 
    deleteBlog 
} from '../controllers/blog.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";
import { upload } from "../middlewares/multer.middleware.js"; 

const router = Router();

router.route("/").get(getAllBlogs); 

router.route("/").post(verifyJWT, verifyAdmin, upload.single("image"), createBlog); 

router.route("/:blogId")
    .get(getBlogById)                                        
    .patch(verifyJWT, verifyAdmin, upload.single("image"), updateBlog) 
    .delete(verifyJWT, verifyAdmin, deleteBlog);            

export default router;