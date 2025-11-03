const express = require('express');
require('dotenv').config();
const connectDB = require("./db");
const cors = require('cors');
const app = express();
const userRoutes = require("./routes/useRoutes");
const connectionRoutes = require("./routes/connectionRequestRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const chatsRoutes = require("./routes/chatsRoutes");
const cookieParser = require('cookie-parser');
const http = require("http");
const initializeSocket = require('./utils/initializeSocket');
const { scheduleReminderEmails } = require("./utils/cronsJobs");

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

app.use(userRoutes);
app.use(connectionRoutes);
app.use(paymentRoutes);
app.use(chatsRoutes);
scheduleReminderEmails();

const server = http.createServer(app);

initializeSocket(server);

async function startServer() {
    try {
        await connectDB;

        server.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on port ${process.env.PORT}`);
        });

    } catch (err) {
        console.error("❌ Failed to connect DB", err);
    }
}

startServer();
