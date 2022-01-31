import { hash } from 'bcrypt';

import { environmentVariables } from '../../../config/environment';
import { tokensConfig } from '../../../config/tokens';
import { ValidsRefreshTokenModel } from '../../../database/models/ValidRefreshTokens';
import { IRefreshToken } from '../../../interfaces/RefreshToken';

const { expiresIn: expiresInRefreshToken } = tokensConfig.refreshToken;
const { REFRESH_TOKEN_SECRET, BCRYPT_SALT_ROUNDS } = environmentVariables;

export const createRefreshTokenService = async (
  id: string
): Promise<IRefreshToken> => {
  const encryptedSecret = await hash(
    REFRESH_TOKEN_SECRET,
    Number(BCRYPT_SALT_ROUNDS)
  );
  // const refreshToken: IRefreshToken = {
  //   accessId: id,
  //   expiresIn: expiresInRefreshToken,
  //   secret: encryptedSecret,
  // };

  const refreshToken: IRefreshToken = await ValidsRefreshTokenModel.create({
    accessId: id,
    expiresIn: expiresInRefreshToken,
    secret: encryptedSecret,
  });
  return refreshToken;
};
