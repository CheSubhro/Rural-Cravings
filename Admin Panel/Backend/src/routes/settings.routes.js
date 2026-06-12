
import { Router } from "express";
import { getSettings, updateSettings } from "../controllers/settings.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/")
    .get(getSettings) 
    .patch(verifyJWT, verifyAdmin, updateSettings); 
export default router;