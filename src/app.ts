import express from "express";
import morgan from "morgan";
const app = express();


// Middlewares
app.use(express.json());

export default app;