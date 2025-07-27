// Import Mongoose to connect with MongoDB
import mongoose from "mongoose";

// Load environment variables from .env file into process.env
import dotenv from "dotenv";

// Import the Express application instance
import app from "./app";

// Import configuration settings (e.g., PORT, DB_URI)
import { config } from "./config";

import { logger } from './utils/logger';

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
    logger.info(`✅ Connected to MongoDB`);

    // Start the Express server
    app.listen(PORT, () => {
      logger.info(`🚀 Server is running at http://localhost:${PORT}`);
    });
  } catch (error: any) {
    // Handle MongoDB connection error
    logger.error(`❌ MongoDB connection error:`, error.message);
    process.exit(1); // Exit the process with failure
  }
};

// Run the server
connectDB();