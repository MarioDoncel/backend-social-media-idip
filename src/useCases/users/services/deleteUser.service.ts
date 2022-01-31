import { UserModel } from '../../../database/models/User';
import { IUser } from '../../../interfaces/User';

export const deleteUserService = async (_id: string) => {
  const deletedUser = await UserModel.findByIdAndDelete(_id);
  return deletedUser;
};
