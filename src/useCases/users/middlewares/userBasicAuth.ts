import { compare } from 'bcrypt';
import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';
import { getUserByEmailService } from '../services/getUserByEmail.service';

export const userBasicAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.includes('Basic'))
    throw new AppError('Missing authorization header');

  const [, base64Data] = authHeader.split(' ');
  const credentials = Buffer.from(base64Data, 'base64').toString('utf-8');
  const [email, password] = credentials.split(':');

  try {
    const user: IUser | null = await getUserByEmailService(email);
    if (!user) throw new AppError('Invalid authentication credentials');
    if (!user.password) throw new AppError('Invalid user register');

    const passwordMatchs: boolean = await compare(password, user.password);
    if (!passwordMatchs)
      throw new AppError('Invalid authentication credentials');

    user.password = '';
    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
