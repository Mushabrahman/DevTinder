const express = require('express');
const User = require("../modelSchema/useModel");
const authUser = require('../middlewares/utils.js')

const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/api/signup', async (req, res) => {
    try {
        const { password,emailId, ...rest } = req.body;

         const user = await User.findOne({ emailId: emailId });

         if(user){
            throw new Error("Enter unique credentials!")
         }

        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password, saltRound);

        const newUser = new User({ ...rest,emailId, password: hashPassword })

        const save = await newUser.save();
        console.log(save)
        res.status(201).send(save);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

router.post("/api/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        console.log(emailId,password)

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            throw new Error("Credential not found")
        }


        const userPassword = user.password

        const result = bcrypt.compare(password, userPassword);

        if (await result) {
            const token = jwt.sign({ id: user._id, email: user.emailId }, " your_very_secure_secret_here", {
                expiresIn: "1h"
            })
            res.cookie('accessToken', token);
            res.status(201).json({
                message: "Data fetched successfully",
                user: user
            })

        }
        else {
            throw new Error("Credential not found")
        }

    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});

router.get('/api/profile', authUser, async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            throw new Error("No user found")
        };

        res.status(201).json({
            message: "Data fetched successfully",
            user: user
        })

    } catch (error) {
        res.status(404).json({ "Error is:": error.message });
    }

});

router.patch('/api/editUser', authUser, async (req, res) => {
    try {
        const allowedFields = ["firstName", "lastName", "about", "skills", "age", "gender"];

        const arr = Object.keys(req.body);

        const isEditAllowed = arr.every((field) => allowedFields.includes(field));

        if (!isEditAllowed) {
            throw new Error("Edited fields are not allowed");
        }

        const logedInUser = req.user;

        arr.forEach(key => logedInUser[key] = req.body[key]);

        const updatedUser = await logedInUser.save();

        res.status(200).json({
            message: "Data fetched successfully",
            user: updatedUser
        });

    } catch (err) {
        res.status(404).json({ "Error": err.message });
    }
});

router.post("/api/logout", async (req, res) => {
    {
        res.cookie("accessToken", null, {
            expires: new Date(Date.now())
        })
        res.send("Logout successfully")
    }
})


module.exports = router
