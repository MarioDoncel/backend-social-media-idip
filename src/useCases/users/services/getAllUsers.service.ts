import { UserModel } from '../../../database/models/User';
import { IUser } from '../../../interfaces/User';

export const getAllUsersService = async (): Promise<IUser[]> => {
  const users: IUser[] = await UserModel.find();
  return users;
};
