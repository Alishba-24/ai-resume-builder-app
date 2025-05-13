import express from "express";  
const router = express.Router();
import { verifyPayment, createCheckoutSession, checkUserAlreadyPaid } from "../controllers/paymentController.js";
import { authenticate } from "../auth/verifyToken.js";

router.post("/create-checkout-session", authenticate, createCheckoutSession);
router.get("/verify-payment", authenticate, verifyPayment);
router.get("/check-user-paid", authenticate, checkUserAlreadyPaid); 

export default router;
