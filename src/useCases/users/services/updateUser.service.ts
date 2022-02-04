import { UserModel } from '../../../database/models/User';
import { IUser } from '../../../interfaces/User';
import { encryptPassword } from '../../../utils/encryptPassword';

export const updateUserService = async (
  _id: string,
  updateFields: Partial<IUser>
) => {
  const { email } = updateFields;
  const { password } = updateFields;
  if (password) {
    const encryptedPassword: string = await encryptPassword(password);
    // eslint-disable-next-line no-param-reassign
    updateFields.password = encryptedPassword;
  }
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id },
    { ...updateFields, emailVerified: !email },
    { new: true }
  );
  return updatedUser;
};
