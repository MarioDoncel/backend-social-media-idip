import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';
import { createUserService } from '../services/createUser.service';
import { sendUserVerificationEmailService } from '../services/sendUserVerificationEmail.service';

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
    if (!user.id) throw new AppError('Error on creating user');

    await sendUserVerificationEmailService(user.email, user.id.toString());

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
