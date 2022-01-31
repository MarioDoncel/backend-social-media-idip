import { NextFunction, Response, Request } from 'express';
import { MongooseDocument } from 'mongoose';

import { UserModel } from '../../../database/models/User';
import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';
import { getUserByIdService } from '../services/getUserById.service';

export const followUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser = res.locals.user;
  const { id: idToFollow } = req.params;
  if (!idToFollow) throw new AppError('User id param is invalid');
  if (idToFollow === loggedUser.id)
    throw new AppError('User can´t follow himself');
  if (loggedUser.followings.includes(idToFollow))
    throw new AppError('User already following the target user');

  try {
    const userToFollow: IUser | null = await getUserByIdService(idToFollow);
    if (!userToFollow) throw new AppError('User not found');

    await UserModel.findOneAndUpdate(
      { _id: loggedUser.id },
      { $push: { followings: idToFollow } }
    );
    await UserModel.findOneAndUpdate(
      { _id: idToFollow },
      { $push: { followers: loggedUser.id } }
    );
    // await (userToFollow as unknown as Document).updateOne({
    //   $push: { following: idToFollow },
    // });

    return res.status(200).json('Following and followers updated');
  } catch (error) {
    return next(error);
  }
};
