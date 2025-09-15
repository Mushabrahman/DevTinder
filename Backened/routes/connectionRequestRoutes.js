const express = require('express');
const authUser = require('../middlewares/utils')
const ConnectionRequest = require("../modelSchema/connectionRequestModel");
const User = require("../modelSchema/useModel");

const router = express.Router();

router.post('/api/request/send/:status/:toUserId', authUser, async (req, res) => {
    try {

        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const userRequestField = new ConnectionRequest({
            fromUserId,
            toUserId,
            status
        })

        if (fromUserId.equals(toUserId)) {
            throw new Error(`connection request is invalid`);
        }

        allowedStatus = ["ignore", "interested"];

        if (!allowedStatus.includes(status)) {
            throw new Error(`invalid type status ${status}`);
        }

        if (!await User.findById(toUserId)) {
            throw new Error(`User not found`);
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { toUserId: fromUserId, fromUserId: toUserId }
            ]
        })

        if (existingConnectionRequest) {
            throw new Error(`connection request already send`);
        }

        const saveData = await userRequestField.save();

        res.status(200).json({
            message: "Connection Request successfully",
            saveData
        });

    } catch (error) {
        res.status(400).json({ message: err.message });
    }
})

router.post('/api/request/review/:status/:toUserId', authUser, async (req, res) => {
    try {
        const LogedinUser = req.user;
        const status = req.params.status;
        const requestId = req.params.toUserId

       

        const allowedStatus = ["accepted", "rejected"];

        if (!allowedStatus.includes(status)) {
            throw new Error(`invalid type status ${status}`)
        }

        const connectionRequest =await ConnectionRequest.findOne({
            status: "interested",
            toUserId: LogedinUser._id,
            fromUserId: requestId
        })

   

        if (!connectionRequest) {
            throw new Error("Connection request not found");
        }

        connectionRequest.status = status;

        const data = await connectionRequest.save();

        res.status(200).json({
            message: `Connection request ${status} successfully`,
            data
        });

    }
    catch (Error) {
        res.status(400).json({
            message: Error.message
        })
    }
}
)

router.get('/api/request/received', authUser, async (req, res) => {
    try {

        const LogedinUser = req.user;

        const allRequests = await ConnectionRequest.find({
            toUserId: LogedinUser._id,
            status: "interested",
        }).populate("fromUserId", ["firstName", "lastName", "gender", "about", "skills", "age"]);

        if (!allRequests) {
            throw new Error("No request found");
        }

        res.status(200).json({
            message: "Data fetched successfully",
            data: allRequests
        })

    }
    catch (Error) {
        res.status(404).json({ message: Error.message });
    }
})

router.get('/api/feed', authUser, async (req, res) => {
    try {

        const LogedinUser = req.user;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 100;
        limit = limit > 50 ? 50 : limit;

        const skip = (page - 1) * limit;

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
            { _id: { $ne: LogedinUser._id } }
            ]
        }).select("firstName lastName skills  about age gender").skip(skip).limit(limit)

        res.status(200).json({
            data: allFeed
        })

    }
    catch (Error) {
        res.status(400).json({ message: Error.message });
    }
})

router.get('/api/connections', authUser, async (req, res) => {
    try {
        const LogedinUser = req.user;

        const connections =await ConnectionRequest.find({
            status: "accepted",
            toUserId: LogedinUser._id,
        }).populate("fromUserId", ["firstName", "lastName", "gender", "about", "skills", "age"]);

        if (!connections) {
            throw new Error("Connections request not found");
        }

        res.status(200).json({
            message: `Connections fetched successfully`,
            data: connections
        });


    } catch (err) {
        res.status(400).json({
            message: Error.message
        })
    }
})

module.exports = router