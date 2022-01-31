import { UserModel } from '../../../database/models/User';

export const followUserService = async (
  idToFollow: string,
  idLoggedUser: string
) => {
  await UserModel.findOneAndUpdate(
    { _id: idLoggedUser },
    { $push: { followings: idToFollow } }
  );
  await UserModel.findOneAndUpdate(
    { _id: idToFollow },
    { $push: { followers: idLoggedUser } }
  );
};
