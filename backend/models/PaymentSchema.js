import mongoose from "mongoose";


const PaymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  template_id: { type: String, required: true }, 
  stripe_session_id: { type: String },
  payment_status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending"
  },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model("TemplatePurchase", PaymentSchema);
