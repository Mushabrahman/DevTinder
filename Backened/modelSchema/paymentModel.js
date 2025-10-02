// models/Payment.js
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    razorpay_order_id: {
      type: String,
      required: true,
    },
    razorpay_payment_id: {
      type: String,
    },
    razorpay_signature: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    receipt: {
      type: String,
    },
    entity: {
      type: String,
    },
    notes: {
      firstName: { type: String },
      lastName: { type: String },
      emailId: { type: String },
      membershipType: { type: String },
    },
    status: {
      type: String,
      enum: ["created", "paid", "failed"],
      default: "created",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
