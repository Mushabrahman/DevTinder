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
    enum: {
      values: ["male", "female", "other"],
    }
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  membershipType: {
    type: String
  },
  profilePhoto: {
    type: String,
    default: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }
},
  { timestamps: true })

module.exports = mongoose.model("User", userSchema);