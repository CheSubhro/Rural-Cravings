
import { Router } from "express";
import { getSalesOverviewReport,
         getTopSellingItemsReport,
         getSalesTrendReport,
         getUnderperformingItemsReport,
         getInsightsReport 
     } from "../controllers/report.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.use(verifyJWT, verifyAdmin);

router.route("/sales-overview").get(getSalesOverviewReport);
router.route("/top-items").get(getTopSellingItemsReport);

router.route("/sales-trend").get(getSalesTrendReport);
router.route("/underperforming-items").get(getUnderperformingItemsReport);
router.route("/insights").get(getInsightsReport);

export default router;