const Razorpay = require('razorpay')

var instance = new Razorpay({
  key_id: process.env.RAZORPAYKEY,
  key_secret: process.env.RAZORPAYSECRET,
});

module.exports = instance;


