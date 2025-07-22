import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: Number(process.env.PORT) || 3000,
    mongoUri:process.env.MONGODB_URI || "",
    env: process.env.NODE_ENV || "development",
    logLevel: process.env.LOG_LEVEL || "info",
};