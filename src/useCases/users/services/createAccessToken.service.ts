import { sign } from 'jsonwebtoken';

import { tokensConfig } from '../../../config/tokens';

export const createAccessTokenService = (id: string): string => {
  const { secret, expiresIn: expiresInJwt } = tokensConfig.jwt;
  const accessToken: string = sign({}, secret, {
    subject: id,
    expiresIn: expiresInJwt,
  });
  return accessToken;
};
