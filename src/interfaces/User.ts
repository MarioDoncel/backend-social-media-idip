import { ObjectId } from 'mongodb';

export interface IUser {
  id?: ObjectId;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  telephone: string;
  email: string;
  emailVerified: boolean;
  password?: string;
  profileImage?: string;
  followings: ObjectId[];
  followers: ObjectId[];
  postsTenLast: ObjectId[];
}
