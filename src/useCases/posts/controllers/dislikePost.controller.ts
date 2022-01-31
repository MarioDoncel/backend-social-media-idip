import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IPost } from '../../../interfaces/Post';
import { IUser } from '../../../interfaces/User';
import { dislikePostService } from '../services/dislikePost.service';
import { likePostService } from '../services/likePost.service';

export const dislikePostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = res.locals.user as IUser;
  const { postId } = req.params;
  if (!postId || !userId) throw new AppError('Missing information');

  try {
    const post: IPost | null = await dislikePostService(postId, userId);
    if (!post) throw new AppError('Post not found');

    return res.status(200).json(post.likes);
  } catch (error) {
    return next(error);
  }
};
