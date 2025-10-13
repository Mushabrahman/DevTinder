const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  senderName: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true,
  },
  attachments: [String],
  seenBy: [
    { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  ],
  seenAt: Date,
}, { timestamps: true })

const chatSchema = new mongoose.Schema({
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
  ],
  message: [messageSchema]
});

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;



