
import { Router } from "express";
import { subscribeToNewsletter } from "../controllers/newsletter.controller.js";

const router = Router();

// POST /api/v1/newsletter/subscribe
router.route("/subscribe").post(subscribeToNewsletter);

export default router;