import { NextFunction, Response, Request } from 'express';

import { ValidsRefreshTokenModel } from '../../../database/models/ValidRefreshTokens';
import { IRefreshToken } from '../../../interfaces/RefreshToken';
import { deleteRefreshTokenService } from '../services/deleteRefresehToken.service';

export const logoutUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const refreshToken: IRefreshToken = JSON.parse(req.cookies.refreshToken);
  try {
    // eslint-disable-next-line no-underscore-dangle
    if (refreshToken._id) await deleteRefreshTokenService(refreshToken._id);

    res.clearCookie('accessToken', {
      sameSite: 'none',
      secure: true,
    });
    res.clearCookie('refreshToken', {
      sameSite: 'none',
      secure: true,
    });
    return res.status(200).json('Logout success');
  } catch (error) {
    return next(error);
  }
};
