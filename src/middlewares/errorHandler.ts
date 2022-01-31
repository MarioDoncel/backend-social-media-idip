import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/appError';

export const errorHandler = (
  err: Error,
  request: Request,
  response: Response,
  next: NextFunction
): Response => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).send({
      status: 'Error',
      message: err.message,
      data: err?.data,
    });
  }

  return response.status(500).send({
    status: 'error',
    message: 'Internal servel Error',
  });
};
