// Import Schema and model from Mongoose to define the Task schema
import { Schema, model } from "mongoose";

// Define the structure and rules for a Task document
const taskSchema = new Schema({

// Task title - required and trimmed to remove extra spaces
    title: {
        type: String,
        required: true,
        trim: true,
    },
    // Optional task description (trimmed string)
    description: {
        type: String,
        trim: true,
    },
    // Task status with predefined values and a default of "pending"
    status: {
        type: String,
        enum: ["pending", "in_progress", "completed"],
        default: "pending"
    },
    // Optional due date for the task
    dueDate: {
        type: Date,
    },
},
    {
        // Automatically adds createdAt and updatedAt timestamps
        timestamps: true,
    }
);

// Create and export the Task model to use in the database
export const TaskModel = model("Task", taskSchema);