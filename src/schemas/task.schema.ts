import Joi from "joi";

export const createTaskSchema = Joi.object({
    title: Joi.string().min(1).max(200).required(),
    description: Joi.string().max(1000).optional(),
    status: Joi.string().valid("pending", "in_rogress", "completed").optional(),
    dueDate: Joi.date().iso().optional(),
});

export const updateTaskSchema = Joi.object({
    title: Joi.string().min(1).max(200).optional(),
    description: Joi.string().max(1000).optional(),
    status: Joi.string().valid('pending', 'in_progress', 'completed').optional().messages({
        'any.only': 'Invalid status value',
    }),
    dueDate: Joi.date().iso().optional(),
});