import { NextFunction, Response, Request } from 'express';

import { IPost } from '../../../interfaces/Post';
import { getPostsByUserIdService } from '../services/getPostsByUserId.service';

export const getPostsByUserIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId } = req.params;
  try {
    const posts: IPost[] = await getPostsByUserIdService(userId);
    return res.status(200).json(posts);
  } catch (error) {
    return next(error);
  }
};
