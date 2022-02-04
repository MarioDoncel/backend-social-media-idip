import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IPost } from '../../../interfaces/Post';
import { IUser } from '../../../interfaces/User';
import { commentPostService } from '../services/commentPost.service';

export const commentPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = res.locals.user as IUser;
  const { postId } = req.params;
  const { text } = req.body;
  if (!postId || !text || !userId)
    throw new AppError('Missing post information');

  try {
    const post: IPost | null = await commentPostService({
      postId,
      text,
      userId,
    });
    if (!post) throw new AppError('Post not found');

    return res.status(201).json(post.comments);
  } catch (error) {
    return next(error);
  }
};
