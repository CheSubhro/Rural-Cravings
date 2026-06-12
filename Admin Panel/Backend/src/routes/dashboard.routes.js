
import { Router } from 'express';
import { getDashboardSummary } from '../controllers/dashboard.controller.js';
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js"; 

const router = Router();

router.route("/summary").get(verifyJWT, verifyAdmin, getDashboardSummary);

export default router;