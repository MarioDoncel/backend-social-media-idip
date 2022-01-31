import { UserModel } from '../../../database/models/User';
import { IUser } from '../../../interfaces/User';

export const updateUserService = async (
  _id: string,
  updatedFields: Partial<IUser>
) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id },
    { ...updatedFields },
    { new: true }
  );
  return updatedUser;
};
