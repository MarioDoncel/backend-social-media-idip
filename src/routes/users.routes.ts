import express from 'express';

import { createUserController } from '../useCases/users/controllers/createUser.controller';
import { deleteUserController } from '../useCases/users/controllers/deleteUser.controller';
import { followUserController } from '../useCases/users/controllers/followUser.controller';
import { getAllUsersController } from '../useCases/users/controllers/getAllUsers.controller';
import { getUserByIdController } from '../useCases/users/controllers/getUserById.controller';
import { loginUserController } from '../useCases/users/controllers/loginUser.controller';
import { sendNewValidationEmailUserController } from '../useCases/users/controllers/sendNewValidationEmailUser.controller';
import { unfollowUserController } from '../useCases/users/controllers/unfollowUser.controller';
import { updateUserController } from '../useCases/users/controllers/updateUser.controller';
import { validateEmailUserController } from '../useCases/users/controllers/validateEmailUser.controller';
import { userBasicAuthMiddleware } from '../useCases/users/middlewares/userBasicAuth';
import { userBearerAuthMiddleware } from '../useCases/users/middlewares/userBearerAuth';

const usersRouter = express.Router();

usersRouter.get('/', getAllUsersController);
usersRouter.get('/:userId', getUserByIdController);
usersRouter.post('/', createUserController);
usersRouter.delete('/', userBearerAuthMiddleware, deleteUserController);
usersRouter.get(
  '/emailvalidation/token',
  userBasicAuthMiddleware,
  sendNewValidationEmailUserController
);
usersRouter.post('/emailvalidation', validateEmailUserController);
usersRouter.post('/login', userBasicAuthMiddleware, loginUserController);
usersRouter.patch('/', userBearerAuthMiddleware, updateUserController);
usersRouter.post('/:id/follow', userBearerAuthMiddleware, followUserController);
usersRouter.delete(
  '/:id/unfollow',
  userBearerAuthMiddleware,
  unfollowUserController
);

export { usersRouter };
