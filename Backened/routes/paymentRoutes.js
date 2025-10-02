const express = require("express");
const paymentRouter = express.Router();
const authUser = require("../middlewares/utils.js");
const instance = require("../utils/RazorPay.js");
const Payment = require("../modelSchema/paymentModel.js");
const { membershipAmount } = require("../utils/constants.js");
const { validateWebhookSignature } = require('razorpay/dist/utils/razorpay-utils')
const User = require("../modelSchema/useModel");

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

        res.json({
            success: true,
            payment: savedPayment.toJSON(),
            keyId: "rzp_test_RLOCIWua1jzG2D"
        });
    } catch (err) {
        console.error("Error creating order:", err);
        res.status(500).json({ success: false, message: "Error creating order" });
    }
});

paymentRouter.post("/api/payment/webhook", async (req, res) => {
    try {

        const webSignature = req.get["X-Razorpay-Signature"];

        const isWebhookValid = validateWebhookSignature(JSON.stringify(req.body), webSignature, "devTinder@123");

        if (!isWebhookValid) {
            res.status(400).json({ msg: "Webhook signature is invalid" });
        }

        const paymentDetails = req.body.payload.payment.entity

        const payment = await Payment.findOne({ razorpay_order_id: paymentDetails.order._id })

        payment.status = paymentDetails.status;

        await payment.save();

        const user = await User.findOne({ _id: payment.userId });

        user.isPremium = true;
        user.membershipType = payment.notes.membershipType

        if (req.body.event == "payment.captured") {

        }

        if (req.body.event == "payment.failed") {

        }

        res.status(200).json({ msg: "Webhook received successfully" });

    } catch (error) {
        console.log(error);
    }
})

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
