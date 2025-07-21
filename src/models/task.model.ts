import { Schema, model } from "mongoose";

const taskSchema = new Schema({
    title: {
        type: String,
        rquired: true,
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

export const TaskModel = model("Task", taskSchema);