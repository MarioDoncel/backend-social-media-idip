import { NextFunction, Response, Request } from 'express';

import { IUser } from '../../../interfaces/User';
import { createUserService } from '../services/createUser.service';

export const createUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    dateOfBirth,
    telephone,
    email,
    password,
  }: IUser = req.body;

  try {
    if (!password) throw new Error('Missing data to create user');
    const user: IUser = await createUserService({
      firstName,
      lastName,
      dateOfBirth,
      telephone,
      email,
      password,
    });

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
