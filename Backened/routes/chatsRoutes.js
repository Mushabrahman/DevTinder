const express = require('express');
const mongoose = require('mongoose');
const Chat = require("../modelSchema/chats.js");
const authUser = require('../middlewares/utils.js');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// --- Ensure uploads directory exists ---
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // use the absolute path
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    // sanitize filename: use timestamp + extension
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}${ext}`;
    cb(null, name);
  }
});

const upload = multer({ storage });

// Route to fetch chat with pagination
router.post("/api/chat", authUser, async (req, res) => {
  try {
    const fromUserId = req.user?._id;
    const { targetUserId, skip = 0, limit = 20 } = req.body;

    if (!targetUserId) {
      return res.status(400).json({ error: "targetUserId is required" });
    }

    const fromObj = new mongoose.Types.ObjectId(fromUserId);
    const toObj = new mongoose.Types.ObjectId(targetUserId);

    let chat = await Chat.findOne({
      participants: { $all: [fromObj, toObj] },
    });

    if (!chat) {
      chat = new Chat({
        participants: [fromObj, toObj],
        message: [],
      });
      await chat.save();
    }

    const totalMessages = chat.message.length;
    const start = Math.max(totalMessages - skip - limit, 0);
    const end = totalMessages - skip;
    const paginatedMessages = chat.message.slice(start, end);

    return res.json({
      chatId: chat._id,
      messages: paginatedMessages,
      hasMore: start > 0,
    });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Upload route
router.post("/api/upload", authUser, upload.single("file"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }
    // Construct the public URL path
    const fileUrl = `/uploads/${req.file.filename}`;
    return res.json({ url: fileUrl });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
