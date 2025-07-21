import { Request, Response } from 'express';
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from '../services/task.service';
import {
    createTaskSchema,
    updateTaskSchema,
} from '../schemas/task.schema';

export const createTaskHandler = async (req: Request, res: Response) => {
    const { error, value } = createTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: error.details[0].message,
                details: error.details.map(d => d.path.join('.')),
            },
        });
    }


    const task = await createTask(value);

    res.status(201).json({
        success: true,
        data: {
            _id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        },
    });
};

export const getTasksHandler = async (req: Request, res: Response) => {
    const { page = '1', limit = '10', status, sort = '-createdAt' } = req.query;

    const filter: any = {};
    if (status) filter.status = status;

    const result = await getTasks(filter, Number(page), Number(limit), String(sort));


    const formattedTasks = result.tasks.map(task => ({
        _id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
    }));

    res.json({
        success: true,
        meta: result.meta,
        data: formattedTasks,
    });
};

export const getTaskByIdHandler = async (req: Request, res: Response) => {
    const task = await getTaskById(req.params.id);
    if (!task) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Task not found',
            },
        });
    }

    res.json({
        success: true,
        data: {
            _id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        },
    });
};

export const updateTaskHandler = async (req: Request, res: Response) => {
    const { error, value } = updateTaskSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'VALIDATION_ERROR',
                message: error.details[0].message,
                details: error.details.map((d) => d.path.join('.')),
            },
        });
    }


    const task = await updateTask(req.params.id, value);
    if (!task) {
        return res.status(404).json({ success: false, error: 'Task not found' });
    }

    res.json({
        success: true,
        data: {
            _id: task._id,
            title: task.title,
            description: task.description,
            status: task.status,
            dueDate: task.dueDate,
            createdAt: task.createdAt,
            updatedAt: task.updatedAt,
        },
    });
};

export const deleteTaskHandler = async (req: Request, res: Response) => {
  const task = await deleteTask(req.params.id);

  if (!task) {
    return res.status(404).json({
      success: false,
      error: {
        code: 'NOT_FOUND',
        message: 'Task not found',
      },
    });
  }

  res.status(204).send();
};