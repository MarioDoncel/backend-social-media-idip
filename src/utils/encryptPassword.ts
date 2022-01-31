import bcrypt from 'bcrypt';

import { environmentVariables } from '../config/environment';

const { BCRYPT_SALT_ROUNDS } = environmentVariables;

export const encryptPassword = async (password: string): Promise<string> => {
  const encryptedPassword = await bcrypt.hash(
    password,
    Number(BCRYPT_SALT_ROUNDS)
  );
  return encryptedPassword;
};
