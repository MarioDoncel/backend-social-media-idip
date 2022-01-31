import { ObjectId } from 'mongodb';

export interface IPost {
  _id: ObjectId;
  user: ObjectId;
  text: string;
  comments?: [text: string, user: ObjectId];
  likes?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
