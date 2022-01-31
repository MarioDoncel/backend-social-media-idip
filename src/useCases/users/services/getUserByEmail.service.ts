import { UserModel } from '../../../database/models/User';
import { IUser } from '../../../interfaces/User';

export const getUserByEmailService = async (
  email: string
): Promise<IUser | null> => {
  const user: IUser | null = await UserModel.findOne({ email });
  return user;
};
