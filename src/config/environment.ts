import { IEnvironmentVariables } from '../interfaces/Environment';

export const environmentVariables: IEnvironmentVariables = {
  MONGO_CONNECTION:
    process.env.MONGO_CONNECTION || 'Set your connection string',
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || '10',
  JWT_SECRET: process.env.JWT_SECRET || 'default',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'default',
};
