import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IPost } from '../../../interfaces/Post';
import { createPostService } from '../services/createPost.service';

export const createPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { text, image } = req.body;
  const { id: userId } = res.locals.user;
  if (!userId || !text)
    throw new AppError('Post is missing required information');

  try {
    const post: IPost = await createPostService({ userId, text, image });
    return res.status(200).json(post);
  } catch (error) {
    return next(error);
  }
};
