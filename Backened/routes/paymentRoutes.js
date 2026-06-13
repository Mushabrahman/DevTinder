const express = require("express");
const paymentRouter = express.Router();
const authUser = require("../middlewares/utils.js");
const instance = require("../utils/RazorPay.js");
const Payment = require("../modelSchema/paymentModel.js");
const { membershipAmount } = require("../utils/constants.js");
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils')
const User = require("../modelSchema/useModel");
const crypto = require("crypto");

paymentRouter.post("/api/payment/create", authUser, async (req, res) => {
    try {
        const { membershipType } = req.body;
        const { firstName, lastName, emailId, _id } = req.user;

        const options = {
            amount: membershipAmount[membershipType] * 100,
            currency: "INR",
            receipt: `receipt#${Date.now()}`,
            notes: {
                firstName,
                lastName,
                emailId,
                membershipType,
            },
        };

        const order = await instance.orders.create(options);

        const dbOrder = new Payment({
            userId: _id,
            razorpay_order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            entity: order.entity,
            status: order.status,
            receipt: order.receipt,
            notes: order.notes,
        });

        const savedPayment = await dbOrder.save();

        console.log("Payment created;;;")

        res.json({
            success: true,
            payment: savedPayment.toJSON(),
            keyId: process.env.RAZORPAYKEY
        });
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ success: false, message: "Error creating order" });
    }
});

paymentRouter.post("/api/payment/webhook", async (req, res) => {
    try {
        console.log("🔥 WEBHOOK HIT");

        const secret = process.env.WEBHOOKSIGN;
        const signature = req.headers["x-razorpay-signature"];

        const rawBody = req.body.toString(); // IMPORTANT (Buffer → string)

        const expectedSignature = crypto
            .createHmac("sha256", secret)
            .update(rawBody)
            .digest("hex");

        console.log("signature match:", expectedSignature === signature);

        if (expectedSignature !== signature) {
            return res.status(400).json({ msg: "Invalid signature" });
        }

        const body = JSON.parse(rawBody);
        const paymentDetails = body.payload.payment.entity;

        const payment = await Payment.findOne({
            razorpay_order_id: paymentDetails.order_id
        });

        console.log("Mongo Payment:", payment);

        if (!payment) {
            return res.status(404).json({ msg: "Payment not found" });
        }

        payment.status = paymentDetails.status;
        payment.razorpay_payment_id = paymentDetails.id;

        await payment.save();

        const user = await User.findById(payment.userId);

        user.isPremium = true;
        user.membershipType = payment.notes.membershipType;

        await user.save();

        return res.status(200).json({ msg: "success" });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: "server error" });
    }
});

paymentRouter.get("/api/premium/verify", authUser, async (req, res) => {
    try {

        const user = req.user.toJSON();

        if (user.isPremium) {
            return res.json({ ...user });
        }

        return res.json({ ...user });

    } catch (error) {
        console.log(error);
    }
})

module.exports = paymentRouter;
