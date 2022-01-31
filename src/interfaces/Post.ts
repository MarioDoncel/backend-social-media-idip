import { ObjectId } from 'mongodb';

export interface IPost {
  id: ObjectId;
  userId: ObjectId;
  text: string;
  image: string;
  comments?: [text: string, user: ObjectId];
  likes?: ObjectId[];
  createdAt?: Date;
  updatedAt?: Date;
}
