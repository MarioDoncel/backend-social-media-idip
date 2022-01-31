import { UserModel } from '../../../database/models/User';
import { IUser } from '../../../interfaces/User';
import { encryptPassword } from '../../../utils/encryptPassword';
import { ICreateUserDTO } from '../dtos/createUser.dto';

export const createUserService = async ({
  firstName,
  lastName,
  dateOfBirth,
  telephone,
  email,
  password,
}: ICreateUserDTO): Promise<IUser> => {
  const encryptedPassword: string = await encryptPassword(password);

  const user: IUser = await UserModel.create({
    firstName,
    lastName,
    dateOfBirth,
    telephone,
    email,
    password,
  });

  return user;
};
