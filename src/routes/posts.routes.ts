import express from 'express';

import { createPostController } from '../useCases/posts/controllers/createPost.controller';
import { getAllPostsController } from '../useCases/posts/controllers/getAllPosts.controller';
import { getPostsByUserIdController } from '../useCases/posts/controllers/getPostsByUserId.controller';

const postsRouter = express.Router();

postsRouter.post('/', createPostController);
postsRouter.get('/', getAllPostsController);
postsRouter.get('/:userId', getPostsByUserIdController);

export { postsRouter };
