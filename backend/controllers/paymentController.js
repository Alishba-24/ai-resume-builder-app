import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); // Use your actual Stripe Secret Key

import TemplatePurchase from "../models/PaymentSchema.js";

export const createCheckoutSession = async (req, res) => {
  try {
    const { template_id } = req.body;
    const userId = req.userId;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Premium Resume Template`,
            },
            unit_amount: 1000, // $5.00
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `http://localhost:5173/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/payment-fail`,
      metadata: {
        userId: userId.toString(),
        templateId: template_id,
      },
    });

    // Save as pending
    await TemplatePurchase.create({
      user: userId,
      template_id,
      stripe_session_id: session.id,
      payment_status: "pending"
    });

    res.json({ url: session.url });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const { session_id } = req.query;
    console.log('🔍 Received session_id:', session_id);  // Log session_id for debugging

    if (!session_id) {
      console.log("❌ No session ID provided");
      return res.status(400).json({ success: false, message: "Session ID missing" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("🔍 Stripe Session Retrieved:", session);  // Log the full session data

    if (session.payment_status === "paid") {
      const purchase = await TemplatePurchase.findOneAndUpdate(
        { stripe_session_id: session_id },
        {
          user_id: req.userId,  // Comes from authentication middleware
          stripe_session_id: session_id,
          payment_status: "paid",
        },
        { upsert: true, new: true }
      );

      console.log("✅ Payment recorded for user:", purchase.user_id);
      return res.json({ success: true, message: "Payment successful" });
    } else {
      console.log("❌ Payment not completed for session:", session_id);
      return res.json({ success: false, message: "Payment not completed" });
    }
  } catch (err) {
    console.error("⚠️ Error verifying payment:", err);
    return res.status(500).json({ success: false, message: "Payment verification failed" });
  }
};




export const checkUserAlreadyPaid = async (req, res) => {
  try {
    const purchase = await TemplatePurchase.findOne({
      user_id: req.userId,
      payment_status: "paid",
    });

    if (purchase) {
      return res.json({ success: true });
    } else {
      return res.json({ success: false });
    }
  } catch (err) {
    console.error("Error checking payment:", err);
    return res.status(500).json({ success: false, error: "Server error" });
  }
}


