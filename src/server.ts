import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { config } from "./config";

dotenv.config();

const PORT = config.port;
const MONGO_URI = config.mongoUri;
mongoose.connect(MONGO_URI).then(() => {
    console.log(`✅ Connected to MongoDB`);
    app.listen(PORT, () => {
        console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.log(`❌ MongoDB connection error:`, err.message);
    process.exit(1);
});