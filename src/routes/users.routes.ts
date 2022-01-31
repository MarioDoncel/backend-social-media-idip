import express, { NextFunction, Request, Response } from 'express';

import { UserModel } from '../database/models/User';
import { getAllUsersController } from '../useCases/users/controllers/getAllUsers.controller';

const usersRouter = express.Router();

usersRouter.get('/', getAllUsersController);

export { usersRouter };
