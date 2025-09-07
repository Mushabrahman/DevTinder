const { mongoose } = require("mongoose");

const connectDB = mongoose.connect("mongodb+srv://mushabrahman02:UrRnO3mzPIc59Dr3@cluster0.v2qf2ul.mongodb.net/practiceNode");

module.exports = connectDB;