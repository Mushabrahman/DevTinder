const { mongoose } = require("mongoose");

const connectDB = mongoose.connect(process.env.DBCONNECT);

module.exports = connectDB;