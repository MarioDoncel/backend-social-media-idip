import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';
import { updateUserService } from '../services/updateUser.service';

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser: IUser = res.locals.user;
  const { id } = loggedUser;
  if (!id) throw new AppError('Error on user authentication');
  const updatedFields = req.body as Partial<IUser>;
  try {
    const updatedUser = await updateUserService(id.toString(), updatedFields);
    if (!updatedUser) throw new AppError('User not found');

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};
