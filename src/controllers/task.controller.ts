// Import necessary types from Express
import { Request, Response } from 'express';

// Import Mongoose for ObjectId validation
import mongoose from 'mongoose';

// Import service layer functions for task operations
import {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask,
} from '../services/task.service';

// Import Joi validation schemas
import { createTaskSchema, updateTaskSchema } from '../schemas/task.schema';

// Import the Task model (used for checking duplicates)
import { TaskModel } from '../models/task.model';

// Import asyncHandler wrapper
import { asyncHandler } from '../utils/asyncHandler';

// Handler for creating a new task
export const createTaskHandler = asyncHandler(async (req: Request, res: Response) => {

    // Validate request body
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

    // Check for duplicate task title
    const existingTask = await TaskModel.findOne({ title: value.title });
    if (existingTask) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'DUPLICATE_TASK',
                message: 'Task with this title already exists',
                details: ['title'],
            },
        });
    }

    // Create the task
    const task = await createTask(value);

    // Respond with the created task
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
});

// Handler for retrieving all tasks (supports pagination, filter, sort)
export const getTasksHandler = asyncHandler(async (req: Request, res: Response) => {
    const { page = '1', limit = '10', status, sort = '-createdAt' } = req.query;

    const filter: any = {};
    if (status) filter.status = status;

    // Get tasks from the service with filters
    const result = await getTasks(filter, Number(page), Number(limit), String(sort));

    // Format the tasks
    const formattedTasks = result.tasks.map(task => ({
        _id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
    }));

    // Respond with tasks and metadata
    res.json({
        success: true,
        meta: result.meta,
        data: formattedTasks,
    });
});

// Handler for retrieving a task by ID
export const getTaskByIdHandler = asyncHandler(async (req: Request, res: Response) => {
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
});

// Handler for updating a task by ID
export const updateTaskHandler = asyncHandler(async (req: Request, res: Response) => {

    // Validate request body
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

    // Update task
    const task = await updateTask(req.params.id, value);
    if (!task) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Task not found with the given ID.',
            },
        });
    }

    // Respond with updated task
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
});

// Handler for deleting a task by ID
export const deleteTaskHandler = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            success: false,
            error: {
                code: 'INVALID_ID',
                message: 'Invalid task ID format',
            },
        });
    }

    // Delete the task
    const task = await deleteTask(id);

    if (!task) {
        return res.status(404).json({
            success: false,
            error: {
                code: 'NOT_FOUND',
                message: 'Task not found',
            },
        });
    }

    // Respond with success
    res.status(200).json({ success: true });
});