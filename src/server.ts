import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";
import { config } from "./config";

// Load environment variables from .env file
dotenv.config();

// Get PORT and MongoDB URI from config
const PORT = config.port;
const MONGODB_URI = config.mongoUri;

// Function to connect to MongoDB and start the server
const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log(`✅ Connected to MongoDB`);

    // Start the Express server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (error: any) {
    // Handle MongoDB connection error
    console.error(`❌ MongoDB connection error:`, error.message);
    process.exit(1); // Exit the process with failure
  }
};

// Run the server
connectDB();