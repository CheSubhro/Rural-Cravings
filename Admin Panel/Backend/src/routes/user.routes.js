
import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { registerUser,loginUser,getCurrentUser,getAllStaffs,updateStaff,deleteStaff,logoutUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser);
router.route("/current-user").get(verifyJWT, getCurrentUser);
router.route("/all-staffs").get(verifyJWT, getAllStaffs)
router.route("/delete-staff/:id").delete(verifyJWT, deleteStaff)
router.route("/update-staff/:id").patch(
    verifyJWT,
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    updateStaff
);
router.route("/logout").post(verifyJWT, logoutUser);

export default router
