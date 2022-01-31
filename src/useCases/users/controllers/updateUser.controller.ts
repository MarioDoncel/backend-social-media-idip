import { NextFunction, Response, Request } from 'express';

import { UserModel } from '../../../database/models/User';
import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';
import { getUserByIdService } from '../services/getUserById.service';
import { updateUserService } from '../services/updateUser.service';

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  const updatedFields = req.body as Partial<IUser>;
  try {
    const updatedUser = await updateUserService(userId, updatedFields);
    if (!updatedUser) throw new AppError('User not found');

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};
