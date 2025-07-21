import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";

dotenv.config();

const app = express();


// Middlewares
app.use(express.json());
app.use(morgan("dev"));

export default app;