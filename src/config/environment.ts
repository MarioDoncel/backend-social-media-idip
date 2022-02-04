import { IEnvironmentVariables } from '../interfaces/Environment';

export const environmentVariables: IEnvironmentVariables = {
  MONGO_CONNECTION:
    process.env.MONGO_CONNECTION || 'Set your connection string',
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS || '10',
  JWT_SECRET: process.env.JWT_SECRET || 'default',
  REFRESH_TOKEN_SECRET: process.env.REFRESH_TOKEN_SECRET || 'default',
  SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || 'Create your API key',
  SENDGRID_EMAIL_FROM:
    process.env.SENDGRID_EMAIL_FROM || '88mario.doncel@gmail.com',
  CURRENT_DOMAIN: process.env.CURRENT_DOMAIN || 'http://localhost:5000/',
  VERIFICATION_EMAIL_SECRET: process.env.VERIFICATION_EMAIL_SECRET || 'default',
  FRONT_DOMAIN: process.env.FRONT_DOMAIN || 'http://localhost:3000/',
};
