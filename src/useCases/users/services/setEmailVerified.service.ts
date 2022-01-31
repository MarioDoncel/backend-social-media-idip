import { UserModel } from '../../../database/models/User';
import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';

export const setEmailVerifiedService = async (id: string) => {
  const user: IUser | null = await UserModel.findOneAndUpdate(
    { _id: id },
    { emailVerified: true },
    { new: true }
  );
  if (!user) throw new AppError('User not found');
  return user;
};
