import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';
import { getUserByIdService } from '../services/getUserById.service';
import { unfollowUserService } from '../services/unfollowUser.service';

export const unfollowUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const loggedUser = res.locals.user;
  const { id: idToUnfollow } = req.params;
  if (!idToUnfollow) throw new AppError('User id param is invalid');
  if (idToUnfollow === loggedUser.id)
    throw new AppError('User can´t unfollow himself');
  if (!loggedUser.followings.includes(idToUnfollow))
    throw new AppError('Logged user not following target user');

  try {
    const userToUnfollow: IUser | null = await getUserByIdService(idToUnfollow);
    if (!userToUnfollow) throw new AppError('User not found');

    const updatedLoggedUser = await unfollowUserService(
      idToUnfollow,
      loggedUser.id
    );

    return res.status(200).json(updatedLoggedUser);
  } catch (error) {
    return next(error);
  }
};
