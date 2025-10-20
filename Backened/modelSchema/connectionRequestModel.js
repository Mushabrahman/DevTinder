const mongoose = require("mongoose")

const connectionSchema = new mongoose.Schema({
    toUserId : {
        type: mongoose.Schema.Types.ObjectId,
           require: true,
           ref: "User"
    },
    fromUserId :{
         type: mongoose.Schema.Types.ObjectId,
         require: true,
         ref: "User"
    },
    status: {
        type: String,
        required : true,
        enum:{
          values :  ["accepted","rejected","ignore","interested"],
          message: `{VALUE} is incorrect data type`,
        }
        }
},{timestamps: true})

module.exports = mongoose.model("ConnectionRequest",connectionSchema)