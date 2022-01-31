import { NextFunction, Request, Response } from 'express';
import { CastError } from 'mongoose';

export const castErrorHandler = (
  err: CastError,
  request: Request,
  response: Response,
  next: NextFunction
): Response | void => {
  if (err.kind) {
    return response.status(400).send({
      status: 'Cast Error',
      message: err.message,
    });
  }
  next(err);
  return undefined;
};
