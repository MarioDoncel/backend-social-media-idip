import express, { NextFunction, Request, Response } from 'express';

const postsRouter = express.Router();

postsRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Hello Idip, we are live!');
});

export { postsRouter };
