import { NextFunction, Response, Request } from 'express';
import { unlinkSync } from 'fs';

import { saveS3 } from '../../../config/awsS3';
import { environmentVariables } from '../../../config/environment';
import AppError from '../../../errors/appError';
import { IPost } from '../../../interfaces/Post';
import { createPostService } from '../services/createPost.service';

export const createPostController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { CURRENT_DOMAIN } = environmentVariables;
  const { text } = req.body;
  const { file } = req;
  let image;
  if (file) {
    const { filename } = file;
    image = `${CURRENT_DOMAIN}images/${filename}`;
  }
  const { id: userId } = res.locals.user;
  if (!userId || !text)
    throw new AppError('Post is missing required information');

  try {
    const post: IPost = await createPostService({ userId, text, image });

    if (file) {
      await saveS3(file);
      unlinkSync(file.path);
    }

    return res.status(200).json(post);
  } catch (error) {
    return next(error);
  }
};
