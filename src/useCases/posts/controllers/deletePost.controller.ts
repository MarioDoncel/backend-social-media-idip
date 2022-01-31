import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IPost } from '../../../interfaces/Post';
import { deletePostByIdService } from '../services/deletePostById.service';
import { findPostByIdService } from '../services/findPostById.service';

export const deletePostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.params;
  const { id: userId } = res.locals.user;

  try {
    const post: IPost | null = await findPostByIdService(postId);
    if (!post) throw new AppError('Post not found');
    if (post.userId.toString() !== userId)
      throw new AppError('User cannot delete post from another user');

    await deletePostByIdService(postId);

    return res.status(200).json('Post deleted');
  } catch (error) {
    return next(error);
  }
};
