import { UserModel } from '../../../database/models/User';

export const followUserService = async (
  idToFollow: string,
  idLoggedUser: string
) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: idLoggedUser },
    { $push: { followings: idToFollow } },
    { new: true }
  );
  await UserModel.findOneAndUpdate(
    { _id: idToFollow },
    { $push: { followers: idLoggedUser } }
  );
  return updatedUser;
};
