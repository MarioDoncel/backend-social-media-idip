import AWS from 'aws-sdk';
import express, { NextFunction, Request, Response } from 'express';

import { postsRouter } from './posts.routes';
import { usersRouter } from './users.routes';

const routes = express.Router();

routes.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Hello Idip, we are live!');
});

routes.use('/users', usersRouter);
routes.use('/posts', postsRouter);

// IMAGES FROM S3
routes.get('/images/:imageId', function (req, res, next) {
  const params = { Bucket: 'motivate-social', Key: req.params.imageId };
  const s3 = new AWS.S3({
    region: 'sa-east-1',
  });
  s3.getObject(params, function (err, data) {
    if (err) {
      console.log(err);
    }
    if (data) {
      res.writeHead(200, { 'Content-Type': 'image/jpeg' });
      res.write(data.Body, 'binary');
      res.end(null, 'binary');
    }
  });
});

export { routes };
