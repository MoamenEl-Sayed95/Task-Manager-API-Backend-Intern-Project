import { Router } from 'express';
import {
  createTaskHandler,
  getTasksHandler,
  getTaskByIdHandler,
  updateTaskHandler,
  deleteTaskHandler,
} from '../controllers/task.controller';

const router = Router();

router.post('/', createTaskHandler);
router.get('/', getTasksHandler);
router.get('/:id', getTaskByIdHandler);
router.put('/:id', updateTaskHandler);
router.delete('/:id', deleteTaskHandler);

export default router;