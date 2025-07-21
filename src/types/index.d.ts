export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  _id: string;              // Mongo ObjectId string when returned
  title: string;            // required
  description?: string;     // optional
  status: TaskStatus;       // default: 'pending'
  dueDate?: Date | null;    // optional
  createdAt: Date;          // set automatically
  updatedAt: Date;          // set automatically (schema timestamps)
}