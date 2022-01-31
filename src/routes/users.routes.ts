import express, { NextFunction, Request, Response } from 'express';

import { UserModel } from '../database/models/User';
import { createUserController } from '../useCases/users/controllers/createUser.controller';
import { getAllUsersController } from '../useCases/users/controllers/getAllUsers.controller';

const usersRouter = express.Router();

usersRouter.get('/', getAllUsersController);
usersRouter.post('/', createUserController);

export { usersRouter };
