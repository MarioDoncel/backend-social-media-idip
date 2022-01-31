import { IEnvironmentVariables } from '../interfaces/Environment';

export const environmentVariables: IEnvironmentVariables = {
  MONGO_CONNECTION:
    process.env.MONGO_CONNECTION || 'Set your connection string',
};
