import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import taskRoutes from './routes/task.routes';

dotenv.config();

const app = express();


// Middlewares
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use('/api/tasks', taskRoutes);

export default app;