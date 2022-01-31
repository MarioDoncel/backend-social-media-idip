import express, { NextFunction, Request, Response } from 'express';

import { postsRouter } from './posts.routes';
import { usersRouter } from './users.routes';

const routes = express.Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Hello Idip, we are live!');
});

routes.use('/users', usersRouter);
routes.use('/posts', postsRouter);

export { routes };
