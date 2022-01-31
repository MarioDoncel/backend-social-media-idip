import { UserModel } from '../../../database/models/User';

export const unfollowUserService = async (
  idToFollow: string,
  idLoggedUser: string
) => {
  await UserModel.findOneAndUpdate(
    { _id: idLoggedUser },
    { $pull: { followings: idToFollow } }
  );
  await UserModel.findOneAndUpdate(
    { _id: idToFollow },
    { $pull: { followers: idLoggedUser } }
  );
};
