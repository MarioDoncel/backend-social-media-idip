import { ObjectId } from 'mongodb';

export interface IPost {
  id: ObjectId;
  user: ObjectId;
  text: string;
  comments?: [text: string, user: ObjectId];
  likes?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
