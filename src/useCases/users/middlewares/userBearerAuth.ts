import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';
import { decodSubfromExpiredJWT } from '../../../utils/decodSubfromExpiredJWT';
import { setTokensInCookies } from '../../../utils/setTokensInCookies';
import { createAccessTokenService } from '../services/createAccessToken.service';
import { createRefreshTokenService } from '../services/createRefreshToken.service';
import { getUserByIdService } from '../services/getUserById.service';
import { validateJWTUserService } from '../services/validateJwtUser.service';
import { validateRefreshTokenUserService } from '../services/validateRefreshTokenUser.service';

export const userBearerAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { accessToken, refreshToken } = req.cookies as {
    accessToken: string;
    refreshToken: string;
  };
  if (!accessToken) throw new AppError('Access denied', '', 401);

  try {
    const accessTokenIsValid = validateJWTUserService(accessToken);
    if (accessTokenIsValid.valid && accessTokenIsValid.id) {
      const user: IUser | null = await getUserByIdService(
        accessTokenIsValid.id
      );
      if (!user) throw new AppError('User not found');
      user.password = '';
      res.locals.user = user;
      return next();
    }

    if (accessTokenIsValid.message !== 'jwt expired')
      throw new AppError('User unauthorized', '', 401);

    if (!refreshToken) throw new AppError('Access denied', '', 401);

    const userId = decodSubfromExpiredJWT(accessToken);
    if (typeof userId !== 'string') throw new Error();

    const refreshTokenIsValid = validateRefreshTokenUserService(
      userId,
      JSON.parse(refreshToken)
    );
    if (!refreshTokenIsValid) throw new AppError('User unauthorized', '', 401);

    const user: IUser | null = await getUserByIdService(userId);
    if (!user) throw new AppError('User not found');

    const newAccessToken = createAccessTokenService(userId);
    const newRefreshToken = await createRefreshTokenService(userId);

    setTokensInCookies(newAccessToken, newRefreshToken, res);

    user.password = '';
    res.locals.user = user;
    return next();
  } catch (error) {
    return next(error);
  }
};
