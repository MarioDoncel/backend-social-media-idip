export interface IEnvironmentVariables {
  MONGO_CONNECTION: string;
  BCRYPT_SALT_ROUNDS: string;
  JWT_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  SENDGRID_API_KEY: string;
  SENDGRID_EMAIL_FROM: string;
  CURRENT_DOMAIN: string;
  VERIFICATION_EMAIL_SECRET: string;
  FRONT_DOMAIN: string;
}
