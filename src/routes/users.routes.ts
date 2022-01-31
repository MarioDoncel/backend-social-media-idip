import express from 'express';

import { createUserController } from '../useCases/users/controllers/createUser.controller';
import { getAllUsersController } from '../useCases/users/controllers/getAllUsers.controller';
import { getUserByIdController } from '../useCases/users/controllers/getUserById.controller';
import { loginUserController } from '../useCases/users/controllers/loginUser.controller';
import { userBasicAuthMiddleware } from '../useCases/users/middlewares/userBasicAuth';

const usersRouter = express.Router();

usersRouter.get('/', getAllUsersController);
usersRouter.get('/:userId', getUserByIdController);
usersRouter.post('/', createUserController);
usersRouter.post('/login', userBasicAuthMiddleware, loginUserController);

export { usersRouter };
