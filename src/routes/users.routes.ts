import express from 'express';

import { createUserController } from '../useCases/users/controllers/createUser.controller';
import { followUserController } from '../useCases/users/controllers/followUser.controller';
import { getAllUsersController } from '../useCases/users/controllers/getAllUsers.controller';
import { getUserByIdController } from '../useCases/users/controllers/getUserById.controller';
import { loginUserController } from '../useCases/users/controllers/loginUser.controller';
import { unfollowUserController } from '../useCases/users/controllers/unfollowUser.controller';
import { updateUserController } from '../useCases/users/controllers/updateUser.controller';
import { userBasicAuthMiddleware } from '../useCases/users/middlewares/userBasicAuth';
import { userBearerAuthMiddleware } from '../useCases/users/middlewares/userBearerAuth';

const usersRouter = express.Router();

usersRouter.get('/', getAllUsersController);
usersRouter.get('/:userId', getUserByIdController);
usersRouter.post('/', createUserController);
usersRouter.post('/login', userBasicAuthMiddleware, loginUserController);
usersRouter.patch('/', userBearerAuthMiddleware, updateUserController);
usersRouter.put('/:id/follow', userBearerAuthMiddleware, followUserController);
usersRouter.put(
  '/:id/unfollow',
  userBearerAuthMiddleware,
  unfollowUserController
);

export { usersRouter };
