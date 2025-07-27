// Import Express framework to create the server and handle routing
import express from 'express';

// Import Morgan middleware for logging HTTP requests
import morgan from 'morgan';

// Import dotenv to load environment variables from a .env file
import dotenv from 'dotenv';

// Import task-related routes
import taskRoutes from './routes/task.routes';

// Import middleware to handle 404 Not Found errors
import { notFound } from './middleware/notFound';

// Import middleware to handle general application errors
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