import { NextFunction, Response, Request } from 'express';

import AppError from '../../../errors/appError';
import { IPost } from '../../../interfaces/Post';
import { IUser } from '../../../interfaces/User';
import { commentPostService } from '../services/commentPost.service';
import { deleteCommentPostService } from '../services/deleteCommentPost.service';

export const deleteCommentPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id: userId } = res.locals.user as IUser;
  const { postId } = req.params;
  const { commentId } = req.body;
  if (!postId || !commentId || !userId)
    throw new AppError('Missing information to delete');

  try {
    const post: IPost | null = await deleteCommentPostService({
      postId,
      commentId,
      userId,
    });
    if (!post) throw new AppError('Post not found');

    return res.status(200).json(post.comments);
  } catch (error) {
    return next(error);
  }
};
