import { verify } from 'jsonwebtoken';

import { environmentVariables } from '../config/environment';

export const decodSubfromExpiredJWT = (accessToken: string) => {
  const { JWT_SECRET } = environmentVariables;

  const { sub } = verify(accessToken, JWT_SECRET, {
    ignoreExpiration: true,
  });
  return sub;
};
