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
  profileImage,
}: ICreateUserDTO): Promise<IUser> => {
  const encryptedPassword: string = await encryptPassword(password);

  const userData = {
    firstName,
    lastName,
    dateOfBirth,
    telephone,
    email,
    password: encryptedPassword,
    profileImage,
  };
  if (!profileImage) userData.profileImage = 'https://via.placeholder.com/150';

  const user: IUser = await UserModel.create(userData);

  return user;
};
