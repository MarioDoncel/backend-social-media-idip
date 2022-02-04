import { UserModel } from '../../../database/models/User';

export const unfollowUserService = async (
  idToFollow: string,
  idLoggedUser: string
) => {
  const updatedUser = await UserModel.findOneAndUpdate(
    { _id: idLoggedUser },
    { $pull: { followings: idToFollow } },
    { new: true }
  );
  await UserModel.findOneAndUpdate(
    { _id: idToFollow },
    { $pull: { followers: idLoggedUser } }
  );
  return updatedUser;
};
