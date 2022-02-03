import { NextFunction, Request, Response } from 'express';

import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';

export const isAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser: IUser = res.locals.user;
  const { id } = loggedUser;
  if (!id) throw new AppError('Error on user authentication');

  return res.status(200).json(loggedUser);
};
