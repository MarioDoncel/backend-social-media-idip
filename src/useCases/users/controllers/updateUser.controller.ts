import { NextFunction, Response, Request } from 'express';
import { unlinkSync } from 'fs';

import { deleteS3, saveS3 } from '../../../config/awsS3';
import { environmentVariables } from '../../../config/environment';
import AppError from '../../../errors/appError';
import { IUser } from '../../../interfaces/User';
import { sendUserVerificationEmailService } from '../services/sendUserVerificationEmail.service';
import { updateUserService } from '../services/updateUser.service';

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { CURRENT_DOMAIN } = environmentVariables;
  const loggedUser: IUser = res.locals.user;
  const { id } = loggedUser;
  if (!id) throw new AppError('Error on user authentication');
  const updateFields = req.body as Partial<IUser>;
  const { file } = req;

  if (updateFields.email === loggedUser.email) delete updateFields.email;

  let profileImage;
  if (file) {
    const { filename } = file;
    profileImage = `${CURRENT_DOMAIN}images/${filename}`;
    updateFields.profileImage = profileImage;
  }

  try {
    const updatedUser = await updateUserService(id.toString(), updateFields);
    if (!updatedUser) throw new AppError('User not found');

    if (file) {
      await saveS3(file);
      unlinkSync(file.path);
      if (loggedUser.profileImage)
        await deleteS3(
          loggedUser.profileImage.replace(`${CURRENT_DOMAIN}images/`, '')
        );
    }

    if (updateFields.email)
      sendUserVerificationEmailService(updateFields.email, id.toString());

    return res.status(200).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};
