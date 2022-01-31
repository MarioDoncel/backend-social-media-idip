import { PostModel } from '../../../database/models/Post';
import { IDeleteCommentPostDto } from '../dtos/DeleteCommentPostDto';

export const deleteCommentPostService = async ({
  postId,
  commentId,
  userId,
}: IDeleteCommentPostDto) => {
  const post = await PostModel.findOneAndUpdate(
    { _id: postId },
    { $pull: { comments: { _id: commentId, userId } } },
    { new: true }
  );
  return post;
};
