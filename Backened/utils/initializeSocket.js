const Socket = require("socket.io");
const Chat = require("../modelSchema/chats");
const mongoose = require("mongoose");

const onlineUsers = new Set()

const initializeSocket = (server) => {
  const io = Socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  const broadcastOnlineStatus = () => {
        io.emit("onlineUserUpdate", Array.from(onlineUsers));
    };


  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

     let currentUserId = null;

        socket.on("userConnected", (userId) => {
            if (userId && mongoose.Types.ObjectId.isValid(userId)) {
                currentUserId = userId;
                
                if (!onlineUsers.has(currentUserId)) {
                    onlineUsers.add(currentUserId);
                    console.log(`User ${currentUserId} is now ONLINE. Total: ${onlineUsers.size}`);
                    
                    // Broadcast the change to ALL clients
                    broadcastOnlineStatus();
                }
            }
        });

        // 2. Disconnection & Cleanup
        socket.on("disconnect", () => {
            if (currentUserId) {

                if (onlineUsers.has(currentUserId)) {
                    onlineUsers.delete(currentUserId);
                    console.log(`User ${currentUserId} is now OFFLINE. Total: ${onlineUsers.size}`);
                    
                    broadcastOnlineStatus();
                }
            }
        });


    socket.on("joinChat", ({ targetUserId, senderUserId }) => {
      const room = [senderUserId, targetUserId].sort().join("_");
      console.log("Joining room:", room);
      socket.join(room);
    });

    socket.on(
      "sendMessage",
      async ({ firstName, senderUserId, targetUserId, newMessage, timestamp,attachments }) => {
        try {
          const room = [senderUserId, targetUserId].sort().join("_");

          // Broadcast message to all in room
          io.to(room).emit("messageReceived", {
            firstName,
            newMessage,
            timestamp,
            attachments
          });

          const senderObj = new mongoose.Types.ObjectId(senderUserId);
          const targetObj = new mongoose.Types.ObjectId(targetUserId);

          let chat = await Chat.findOne({
            participants: { $all: [senderObj, targetObj] },
          });

          if (!chat) {
            chat = new Chat({
              participants: [senderObj, targetObj],
              message: [],
            });
          }

          const messageDoc = {
            sender: senderObj,
            senderName: firstName,
            text: newMessage ? newMessage : "",
            timestamp: timestamp ? new Date(timestamp) : new Date(),
            seenBy: [senderObj],
            seenAt: null,
            attachments: attachments,
          };

          chat.message.push(messageDoc);
          await chat.save();

          // After save, you can broadcast the saved message with its _id
          const savedMsg = chat.message[chat.message.length - 1];
          io.to(room).emit("messageSaved", {
            message: {
              _id: savedMsg._id,
              sender: savedMsg.sender,
              senderName: savedMsg.senderName,
              text: savedMsg.text,
              timestamp: savedMsg.timestamp,
              seenBy: savedMsg.seenBy,
              seenAt: savedMsg.seenAt,
              attachments: attachments,
            },
          });
        } catch (err) {
          console.error("Error in sendMessage handler:", err);
        }
      }
    );

    // New: when a client marks a message as seen
    socket.on("messageSeen", async ({ chatId, messageId, userId }) => {
      try {
        const chat = await Chat.findById(chatId);
        if (!chat) return;

        // find message subdocument by id
        const msg = chat.message.id(messageId);
        if (!msg) return;

        const userObj = new mongoose.Types.ObjectId(userId);

        // Add user to seenBy if not already there
        if (!msg.seenBy.some(u => u.equals(userObj))) {
          msg.seenBy.push(userObj);
          msg.seenAt = new Date();
          await chat.save();

          // Broadcast updated seen info
          const room = chat.participants.map(p => p.toString()).sort().join("_");
          io.to(room).emit("messageSeenUpdate", {
            messageId,
            seenBy: msg.seenBy,
            seenAt: msg.seenAt
          });
        }
      } catch (err) {
        console.error("Error in messageSeen handler:", err);
      }
    });
  });

  return io;
};

module.exports = initializeSocket;
