import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import taskRoutes from './routes/task.routes';
import { notFound } from './middleware/notFound';
import { errorHandler } from './middleware/errorHandler';

// add dotenv configuration
dotenv.config();

// initialize Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/tasks', taskRoutes);

// 404 Not Found Middleware
app.use(notFound);

// Error Handler Middleware
app.use(errorHandler);

// export Express app instance
export default app;