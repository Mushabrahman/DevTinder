const express = require('express');
const connectDB = require("./db");
const cors = require('cors');
const app = express();
const userRoutes = require("./routes/useRoutes");
const connectionRoutes = require("./routes/connectionRequestRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const chatsRoutes = require("./routes/chatsRoutes");
const cookieParser = require('cookie-parser');
const http = require("http");
const initializeSocket = require('./utils/initializeSocket')

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const port = 8000;

app.use(userRoutes);
app.use(connectionRoutes);
app.use(paymentRoutes);
app.use(chatsRoutes);

const server = http.createServer(app);

initializeSocket(server);

async function startServer() {
    try {
        await connectDB;
        console.log("✅ MongoDB connected");

        server.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });

    } catch (err) {
        console.error("❌ Failed to connect DB", err);
    }
}

startServer();
