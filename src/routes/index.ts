import express, { NextFunction, Request, Response } from 'express';

const routes = express.Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Hello Idip, we are live!');
});

export { routes };
