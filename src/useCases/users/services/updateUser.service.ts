import { UserModel } from '../../../database/models/User';
import { IUser } from '../../../interfaces/User';

export const updateUserService = async (
  _id: string,
  updateFields: Partial<IUser>
) => {
  const { email } = updateFields;
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id },
    { ...updateFields, emailVerified: !email && false },
    { new: true }
  );
  return updatedUser;
};
