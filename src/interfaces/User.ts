import { ObjectId } from 'mongodb';

export interface IUser {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  telephone: string;
  email: string;
  emailVerified: boolean;
  password?: string;
  profileImage?: string;
  following: ObjectId[];
  followers: ObjectId[];
  postsTenLast: ObjectId[];
}
