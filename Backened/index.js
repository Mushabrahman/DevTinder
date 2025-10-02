const express = require('express');
const connectDB = require("./db");
const cors = require('cors');
const app = express();
const userRoutes = require("./routes/useRoutes");
const connectionRoutes = require("./routes/connectionRequestRoutes")
const paymentRoutes = require("./routes/paymentRoutes")
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(express.json());
app.use(cookieParser());

const port = 8000;

app.use(userRoutes);
app.use(connectionRoutes);
app.use(paymentRoutes);

async function startServer() {
    try {
        await connectDB;
        console.log("✅ MongoDB connected");

        app.listen(port, () => {
            console.log(`Sever running on port ${port}`)
        })

    } catch (err) {
        console.error("❌ Failed to connect DB", err);
    }
}

startServer();