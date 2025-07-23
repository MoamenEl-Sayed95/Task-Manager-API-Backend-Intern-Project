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
    description: {
        type: String,
        trim: true,
    },
    status: {
        type: String,
        enum: ["pending", "in_progress", "completed"],
        default: "pending"
    },
    dueDate: {
        type: Date,
    },
},
    {
        timestamps: true,
    }
);

// Create and export the Task model to use in the database
export const TaskModel = model("Task", taskSchema);