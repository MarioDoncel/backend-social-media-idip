import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';
import { sendUserVerificationEmailService } from '../services/sendUserVerificationEmail.service';
import { updateUserService } from '../services/updateUser.service';

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser: IUser = res.locals.user;
  const { id } = loggedUser;
  if (!id) throw new AppError('Error on user authentication');
  const updateFields = req.body as Partial<IUser>;
  try {
    const updatedUser = await updateUserService(id.toString(), updateFields);
    if (!updatedUser) throw new AppError('User not found');

    if (updateFields.email)
      sendUserVerificationEmailService(updateFields.email, id.toString());

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};
