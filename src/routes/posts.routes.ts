import express from 'express';

import { commentPostController } from '../useCases/posts/controllers/commentPost.controller';
import { createPostController } from '../useCases/posts/controllers/createPost.controller';
import { deleteCommentPostController } from '../useCases/posts/controllers/deleteCommentPost.controller';
import { deletePostController } from '../useCases/posts/controllers/deletePost.controller';
import { getAllPostsController } from '../useCases/posts/controllers/getAllPosts.controller';
import { getPostsByUserIdController } from '../useCases/posts/controllers/getPostsByUserId.controller';
import { userBearerAuthMiddleware } from '../useCases/users/middlewares/userBearerAuth';

const postsRouter = express.Router();

postsRouter.post('/', userBearerAuthMiddleware, createPostController);
postsRouter.delete('/:postId', userBearerAuthMiddleware, deletePostController);
postsRouter.post(
  '/:postId/comment',
  userBearerAuthMiddleware,
  commentPostController
);
postsRouter.delete(
  '/:postId/comment',
  userBearerAuthMiddleware,
  deleteCommentPostController
);
postsRouter.get('/', getAllPostsController);
postsRouter.get('/:userId', getPostsByUserIdController);

export { postsRouter };
