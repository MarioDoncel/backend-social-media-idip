import express from 'express';

import { getAllPostsController } from '../useCases/posts/controllers/getAllPosts.controller';

const postsRouter = express.Router();

postsRouter.get('/', getAllPostsController);

export { postsRouter };
