const express = require('express');
const authUser = require('../middlewares/utils')
const ConnectionRequest = require("../modelSchema/connectionRequestModel");
const User = require("../modelSchema/useModel");

const router = express.Router();

router.post('/api/request/send/:status/:toUserId',authUser,async (req, res) => {
    try {

        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const userRequestField = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        // if(ConnectionRequest.fromUserId.equals(ConnectionRequest.toUserId)){
        //     throw new error(`connection request is invalid`);   
        // }
        
        allowedStatus = ["ignore","interested"];

        if(!allowedStatus.includes(status)){
            throw new error(`invalid type status ${status}`);
        }

        if(!await User.findById(toUserId)){
          throw new error(`User not found`);   
        }

       const existingConnectionRequest = await ConnectionRequest.findOne({
         $or : [
            {fromUserId,toUserId},
            {toUserId:fromUserId,fromUserId:toUserId}
        ]
       })

       if(existingConnectionRequest){
          throw new error(`connection request already send`);
       }

        const saveData =  await userRequestField.save();

        res.status(200).json({
            message: "Connection Request successfully",
            saveData});

    } catch (error) {
         res.status(404).json(error.message);
    }
})
router.post('/api/request/review/:status/:toUserId',authUser,async (req, res) => {
    try{
       const LogedinUser = req.user;
       const status = req.params.status;
       const requestId = req.params.requestId

       const allowedStatus = [accepted,rejected];

       if(!status.includes(allowedStatus)){
        throw new error(`invalid type status ${status}`)
       }

       const connectionRequest = ConnectionRequest.findOne({
        status: "interested",
        toUserId: LogedinUser._id,
        _id: requestId
    })

       if(!connectionRequest){
        throw new error("Connection request not found");
       }

       connectionRequest.status = status;
       
       const data = await connectionRequest.save();

       res.status(200).json({
            message: `Connection request ${status} successfully`,
            data});

    }
    catch (error) {
     res.status(400).json({
        message:error.message
     })
    }
}
)
router.get('/api/request/received',authUser,async(req,res) =>{
    try{
   
        const LogedinUser = req.user;
         
        const allRequests = await ConnectionRequest.find({
            toUserId: LogedinUser._id,
            status: "interested",
        }).populate("fromUserId",["firstName","lastName"]);
    
        if(!allRequests){
            throw new Error("No request found");
        }

        res.status(200).json({
            message: "Data fetched successfully",
            data: allRequests
        })

    }
    catch(error){
        res.status(404).json({message:error.message});
    }
})
router.get('/api/feed',authUser,async (req, res) => {
    try {

        const LogedinUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let  limit = parseInt(req.query.limit) || 10;
        limit = limit>50? 50: limit;

        const skip = (page-1)*limit;

        const exceptionalRequests = await ConnectionRequest.find({
            $or: [{ fromUserId: LogedinUser._id }, { toUserId: LogedinUser._id }]
        }).select("fromUserId toUserId");

        const hiddenRequests = new Set();

        exceptionalRequests.forEach((req) => {
            hiddenRequests.add(req.fromUserId.toString());
            hiddenRequests.add(req.toUserId.toString());
        })

        const allFeed = await User.find({
            $and: [{ _id: { $nin: Array.from(hiddenRequests) } },
            { _id: { $ne: loginUser._id } }
            ]
        }).select("firstName lastName skills  about").skip(skip).limit(limit)

        res.status(200).json({
            data: allFeed
        })

    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
})

module.exports = router