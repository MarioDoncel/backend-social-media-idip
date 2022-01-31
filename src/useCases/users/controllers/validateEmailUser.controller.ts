import { NextFunction, Response, Request } from 'express';
import { verify } from 'jsonwebtoken';

import { environmentVariables } from '../../../config/environment';
import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';
import { setEmailVerifiedService } from '../services/setEmailVerified.service';

export const validateEmailUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.query;
  if (!token) throw new AppError('Validation failed');

  const { VERIFICATION_EMAIL_SECRET } = environmentVariables;

  try {
    const decoded = verify(token.toString(), VERIFICATION_EMAIL_SECRET);
    if (typeof decoded !== 'object' || !decoded.sub)
      throw new AppError('Invalid Token');

    const id = decoded.sub;
    if (!id) throw new AppError('Validation failed');

    await setEmailVerifiedService(id);

    return res.status(200).json('Email Verified');
  } catch (error) {
    return next(error);
  }
};
