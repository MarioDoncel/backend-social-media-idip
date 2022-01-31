import { NextFunction, Response, Request } from 'express';

import { sendUserVerificationEmailService } from '../services/sendUserVerificationEmail.service';

export const sendNewValidationEmailUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser = res.locals.user;

  try {
    await sendUserVerificationEmailService(
      loggedUser.email,
      loggedUser.id.toString()
    );

    return res.status(200).json('Email verification sent');
  } catch (error) {
    return next(error);
  }
};
