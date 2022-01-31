import { NextFunction, Response, Request } from 'express';

import { getAllPostsService } from '../services/getAllPosts.service';

export const getAllPostsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const posts = await getAllPostsService();
    return res.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
};
