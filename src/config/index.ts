// Import dotenv to load environment variables from .env file
import dotenv from "dotenv";

// Load environment variables into process.env
dotenv.config();

// Export a configuration object with commonly used environment settings
export const config = {

   // Application port (default: 3000 if not specified)
    port: Number(process.env.PORT) || 3000,

   // MongoDB connection URI (empty string fallback to avoid undefined)
    mongoUri:process.env.MONGODB_URI || "",

  // Current environment (e.g., development, production)
    env: process.env.NODE_ENV || "development",

  // Logging level (e.g., info, debug, error)
    logLevel: process.env.LOG_LEVEL || "info",
};