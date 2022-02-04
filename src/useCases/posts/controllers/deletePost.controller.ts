import { NextFunction, Response, Request } from 'express';

import { deleteS3 } from '../../../config/awsS3';
import { environmentVariables } from '../../../config/environment';
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
  const { CURRENT_DOMAIN } = environmentVariables;

  try {
    const post: IPost | null = await findPostByIdService(postId);
    if (!post) throw new AppError('Post not found');
    if (post.userId.toString() !== userId)
      throw new AppError('User cannot delete post from another user');

    await deletePostByIdService(postId);
    if (post.image)
      await deleteS3(post.image.replace(`${CURRENT_DOMAIN}images/`, ''));

    return res.status(200).json('Post deleted');
  } catch (error) {
    return next(error);
  }
};
