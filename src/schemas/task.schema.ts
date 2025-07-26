// Import Joi for schema validation
import Joi from "joi";

/**
 * Validation schema for creating a new task
 * - title: required string between 1 and 200 characters
 * - description: optional string up to 1000 characters
 * - status: optional string, must be one of "pending", "in_progress", or "completed"
 * - dueDate: optional ISO-formatted date
 */
export const createTaskSchema = Joi.object({
    title: Joi.string().min(1).max(200).required(),
    description: Joi.string().max(1000).optional(),
    status: Joi.string().valid("pending", "in_progress", "completed").optional(),
    dueDate: Joi.date().iso().optional(),
});

/**
 * Validation schema for updating an existing task
 * - All fields are optional
 * - Custom error message for invalid status value
 */
export const updateTaskSchema = Joi.object({
    title: Joi.string().min(1).max(200).optional(),
    description: Joi.string().max(1000).optional(),
    status: Joi.string().valid('pending', 'in_progress', 'completed').optional().messages({
        'any.only': 'Invalid status value',
    }),
    dueDate: Joi.date().iso().optional(),
});