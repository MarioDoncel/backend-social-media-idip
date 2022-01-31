import { NextFunction, Response, Request } from 'express';

import { getAllUsersService } from '../services/getAllUsers.service';

export const getAllUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = getAllUsersService();
    return res.status(200).json(users);
  } catch (error) {
    return next(error);
  }
};
