import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).json({
            success: false,
            error: {
                code: 'INVALID_ID',
                message: 'Invalid ID format',
            },
        });
    }

    res.status(err.status || 500).json({
        success: false,
        error: {
            code: 'INTERNAL_SERVER_ERROR',
            message: err.message || 'Something went wrong',
        },
    });
};
