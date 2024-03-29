import express from 'express';

import { upload } from '../middlewares/multer';
import { createUserController } from '../useCases/users/controllers/createUser.controller';
import { deleteUserController } from '../useCases/users/controllers/deleteUser.controller';
import { followUserController } from '../useCases/users/controllers/followUser.controller';
import { getAllUsersController } from '../useCases/users/controllers/getAllUsers.controller';
import { getUserByIdController } from '../useCases/users/controllers/getUserById.controller';
import { isAuthController } from '../useCases/users/controllers/isAuth.controller';
import { loginUserController } from '../useCases/users/controllers/loginUser.controller';
import { logoutUserController } from '../useCases/users/controllers/logoutUser.controller';
import { sendNewValidationEmailUserController } from '../useCases/users/controllers/sendNewValidationEmailUser.controller';
import { unfollowUserController } from '../useCases/users/controllers/unfollowUser.controller';
import { updateUserController } from '../useCases/users/controllers/updateUser.controller';
import { validateEmailUserController } from '../useCases/users/controllers/validateEmailUser.controller';
import { userBasicAuthMiddleware } from '../useCases/users/middlewares/userBasicAuth';
import { userBearerAuthMiddleware } from '../useCases/users/middlewares/userBearerAuth';

const usersRouter = express.Router();

usersRouter.get('/', getAllUsersController);
usersRouter.get('/findbyid/:userId', getUserByIdController);
usersRouter.post('/', upload.single('file'), createUserController);
usersRouter.delete('/', userBearerAuthMiddleware, deleteUserController);
usersRouter.get(
  '/emailvalidation/newtoken',
  userBasicAuthMiddleware,
  sendNewValidationEmailUserController
);
usersRouter.get('/emailvalidation', validateEmailUserController);
usersRouter.get('/login', userBasicAuthMiddleware, loginUserController);
usersRouter.get('/isauth', userBearerAuthMiddleware, isAuthController);
usersRouter.delete('/logout', logoutUserController);
usersRouter.patch(
  '/',
  userBearerAuthMiddleware,
  upload.single('file'),
  updateUserController
);
usersRouter.post('/:id/follow', userBearerAuthMiddleware, followUserController);
usersRouter.delete(
  '/:id/unfollow',
  userBearerAuthMiddleware,
  unfollowUserController
);

export { usersRouter };
