import { hash } from 'bcrypt';
import { NextFunction, Response, Request } from 'express';
import { sign } from 'jsonwebtoken';

import { environmentVariables } from '../../../config/environment';
import { tokensConfig } from '../../../config/tokens';
import AppError from '../../../errors/appError';
import { IRefreshToken } from '../../../interfaces/RefreshToken';
import { IUser } from '../../../interfaces/User';
import { setTokensInCookies } from '../../../utils/setTokensInCookies';
import { createAccessTokenService } from '../services/createAccessToken.service';
import { createRefreshTokenService } from '../services/createRefreshToken.service';

export const loginUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser: IUser = res.locals.user;
  const { id } = loggedUser;
  if (!id) throw new AppError('Error on user authentication');

  try {
    const accessToken = createAccessTokenService(id.toString());
    const refreshToken: IRefreshToken = await createRefreshTokenService(
      id.toString()
    );
    setTokensInCookies(accessToken, refreshToken, res);
    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    return next(error);
  }
};
