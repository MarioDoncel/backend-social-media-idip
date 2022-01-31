import { ObjectId } from 'mongodb';

export interface ICommentPostDto {
  text: string;
  userId: ObjectId;
  postId: string;
}
