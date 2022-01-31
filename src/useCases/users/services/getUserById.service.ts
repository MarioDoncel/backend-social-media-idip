import { UserModel } from '../../../database/models/User';
import { IUser } from '../../../interfaces/User';

export const getUserByIdService = async (id: string): Promise<IUser | null> => {
  const user: IUser | null = await UserModel.findById(id);
  return user;
};
