import { Request, Response, NextFunction } from 'express';

export interface ExtendedError extends Error {
  status?: string;
  statusCode?: number;
}

const errorHandler = async (
  error: ExtendedError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(error.statusCode || 500).json({
    error: true,
    status: error.status,
    message: error.message,
  });
};

export default errorHandler;
