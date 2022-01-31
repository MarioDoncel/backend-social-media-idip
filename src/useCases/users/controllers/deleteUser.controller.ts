import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';
import { deleteUserService } from '../services/deleteUser.service';

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser: IUser = res.locals.user;
  const { id } = loggedUser;
  if (!id) throw new AppError('Error on user authentication');
  try {
    const deletedUser = await deleteUserService(id.toString());
    if (!deletedUser) throw new AppError('User not found');

    return res.status(200).json(deletedUser);
  } catch (error) {
    return next(error);
  }
};
