import { TaskModel } from '../models/task.model';

export const createTask = async (data: any) => {
    return await TaskModel.create(data);
};

export const getTasks = async (
    filter: any,
    page = 1,
    limit = 10,
    sort = '-createdAt'
) => {
    const skip = (page - 1) * limit;
    const tasks = await TaskModel.find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean();
    const total = await TaskModel.countDocuments(filter);

    return {
        tasks,
        meta: {
            page,
            limit,
            total,
            totalPages: Math.ceil(total / limit),
            hasNext: page * limit < total,
            hasPrev: page > 1,
        },
    };
};

export const getTaskById = async (id: string) => {
    return await TaskModel.findById(id).lean();
};

export const updateTask = async (id: string, data: any) => {
    return await TaskModel.findByIdAndUpdate(id, data, {
        new: true,
    }).lean();
};

export const deleteTask = async (id: string) => {
    return await TaskModel.findByIdAndDelete(id);
};