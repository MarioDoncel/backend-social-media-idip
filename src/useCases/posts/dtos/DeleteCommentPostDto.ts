import { ObjectId } from 'mongodb';

export interface IDeleteCommentPostDto {
  commentId: string;
  userId: ObjectId;
  postId: string;
}
