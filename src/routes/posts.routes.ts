import express from 'express';

import { upload } from '../middlewares/multer';
import { commentPostController } from '../useCases/posts/controllers/commentPost.controller';
import { createPostController } from '../useCases/posts/controllers/createPost.controller';
import { deleteCommentPostController } from '../useCases/posts/controllers/deleteCommentPost.controller';
import { deletePostController } from '../useCases/posts/controllers/deletePost.controller';
import { dislikePostController } from '../useCases/posts/controllers/dislikePost.controller';
import { getAllPostsController } from '../useCases/posts/controllers/getAllPosts.controller';
import { getPostsByUserIdController } from '../useCases/posts/controllers/getPostsByUserId.controller';
import { likePostController } from '../useCases/posts/controllers/likePost.controller';
import { userBearerAuthMiddleware } from '../useCases/users/middlewares/userBearerAuth';

const postsRouter = express.Router();

postsRouter.post(
  '/',
  userBearerAuthMiddleware,
  upload.single('file'),
  createPostController
);
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
postsRouter.post('/:postId/like', userBearerAuthMiddleware, likePostController);
postsRouter.delete(
  '/:postId/dislike',
  userBearerAuthMiddleware,
  dislikePostController
);
postsRouter.get('/', getAllPostsController);
postsRouter.get('/:userId', getPostsByUserIdController);

export { postsRouter };
