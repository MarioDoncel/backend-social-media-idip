import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';
import { getUserByIdService } from '../services/getUserById.service';

export const getUserByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const user: IUser | null = await getUserByIdService(userId);
    if (!user) throw new AppError('User not found');

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
