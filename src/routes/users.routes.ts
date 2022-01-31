import express from 'express';

import { createUserController } from '../useCases/users/controllers/createUser.controller';
import { getAllUsersController } from '../useCases/users/controllers/getAllUsers.controller';
import { getUserByIdController } from '../useCases/users/controllers/getUserById.controller';

const usersRouter = express.Router();

usersRouter.get('/', getAllUsersController);
usersRouter.get('/:userId', getUserByIdController);
usersRouter.post('/', createUserController);

export { usersRouter };
