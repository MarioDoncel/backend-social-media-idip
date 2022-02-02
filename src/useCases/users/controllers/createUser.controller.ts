import { NextFunction, Response, Request } from 'express';
import { unlinkSync } from 'fs';

import { saveS3 } from '../../../config/awsS3';
import { environmentVariables } from '../../../config/environment';
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
  const { file } = req;

  const { CURRENT_DOMAIN } = environmentVariables;
  let profileImage = '';
  if (file) {
    const { filename } = file;
    profileImage = `${CURRENT_DOMAIN}images/${filename}`;
  }

  try {
    if (!password) throw new Error('Missing data to create user');
    const user: IUser = await createUserService({
      firstName,
      lastName,
      dateOfBirth,
      telephone,
      email,
      password,
      profileImage,
    });
    if (!user.id) throw new AppError('Error on creating user');
    if (file) {
      await saveS3(file);
      unlinkSync(file.path);
    }

    await sendUserVerificationEmailService(user.email, user.id.toString());

    return res.status(200).json(user);
  } catch (error) {
    return next(error);
  }
};
