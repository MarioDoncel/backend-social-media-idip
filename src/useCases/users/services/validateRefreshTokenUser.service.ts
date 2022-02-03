import { compare } from 'bcrypt';

import { environmentVariables } from '../../../config/environment';
import { ValidsRefreshTokenModel } from '../../../database/models/ValidRefreshTokens';
import AppError from '../../../errors/appError';
import { IRefreshToken } from '../../../interfaces/RefreshToken';

export const validateRefreshTokenUserService = async (
  id: string,
  refreshToken: IRefreshToken
) => {
  const { REFRESH_TOKEN_SECRET } = environmentVariables;
  try {
    const withinValidity = refreshToken.expiresIn > Date.now();
    if (!withinValidity) throw new AppError('RefreshToken expired');

    if (id !== refreshToken.accessId)
      throw new AppError('RefreshToken Invalid');

    const validSecret = await compare(
      REFRESH_TOKEN_SECRET,
      refreshToken.secret
    );

    if (!validSecret) throw new AppError('RefreshToken Invalid');

    const refreshTokenInDatabase = ValidsRefreshTokenModel.findById(
      // eslint-disable-next-line no-underscore-dangle
      refreshToken._id
    );

    if (!refreshTokenInDatabase) throw new AppError('RefreshToken Invalid');

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
