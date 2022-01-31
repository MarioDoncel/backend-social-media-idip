import { NextFunction, Request, Response } from 'express';
import { MongoError } from 'mongodb';

export const mongoErrorHandler = (
  err: MongoError,
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (err.name === 'MongoServerError' && err.code === 11000) {
    return response.status(400).send({
      status: 'Mongo Error',
      message: err.message,
    });
  }
  next(err);
  return undefined;
};
