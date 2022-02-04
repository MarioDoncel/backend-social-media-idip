import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IPost } from '../../../interfaces/Post';
import { IUser } from '../../../interfaces/User';
import { likePostService } from '../services/likePost.service';

export const likePostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = res.locals.user as IUser;
  const { postId } = req.params;
  if (!postId || !userId) throw new AppError('Missing information');

  try {
    const post: IPost | null = await likePostService(postId, userId);
    if (!post) throw new AppError('Post not found');

    return res.status(201).json(post.likes);
  } catch (error) {
    return next(error);
  }
};
