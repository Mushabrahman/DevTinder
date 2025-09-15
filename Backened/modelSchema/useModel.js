const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
   lastName: {
        type: String,
   },
   emailId: {
        type: String,
        reuired: true
   },
   password: {
        type: String,
        reuired: true
   },
   about: {
     type: String
   },
      age: {
     type: Number
   },
   skills: {
     type: [String],
     default: []
   },
   gender: {
     type: String,
      reuired: true,
      enum:{
          values :  ["male","female","other"],
        }
   },
},
{ timestamps: true })

module.exports = mongoose.model("User",userSchema);