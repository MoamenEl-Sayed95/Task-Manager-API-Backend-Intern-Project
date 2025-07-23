// Import Router from Express to create route handlers
import { Router } from 'express';

// Import controller functions for handling task-related logic
import {
  createTaskHandler,
  getTasksHandler,
  getTaskByIdHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from '../controllers/task.controller';

// Initialize a new Express router
const router = Router();

// Route to create a new task
router.post('/', createTaskHandler);

// Route to get all tasks (optionally with filters or pagination)
router.get('/', getTasksHandler);

// Route to get a single task by its ID
router.get('/:id', getTaskByIdHandler);

// Route to update a task by its ID
router.put('/:id', updateTaskHandler);

// Route to delete a task by its ID
router.delete('/:id', deleteTaskHandler);

// Export the router to be used in the main app
export default router;