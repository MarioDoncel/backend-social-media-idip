import { Response } from 'express';

import { IRefreshToken } from '../interfaces/RefreshToken';

export const setTokensInCookies = (
  accessToken: string,
  refreshToken: IRefreshToken,
  res: Response
) => {
  const fiveYearsInMilisecoonds = 1000 * 60 * 60 * 24 * 365 * 5;

  res.cookie('accessToken', accessToken, {
    maxAge: fiveYearsInMilisecoonds,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });

  res.cookie('refreshToken', JSON.stringify(refreshToken), {
    maxAge: fiveYearsInMilisecoonds,
    httpOnly: true,
    sameSite: 'none',
    secure: true,
  });
};
