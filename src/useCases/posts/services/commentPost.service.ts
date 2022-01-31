import { PostModel } from '../../../database/models/Post';
import { ICommentPostDto } from '../dtos/CommentPostDto';

export const commentPostService = async ({
  postId,
  text,
  userId,
}: ICommentPostDto) => {
  const post = await PostModel.findOneAndUpdate(
    { _id: postId },
    { $push: { comments: { text, userId } } },
    { new: true }
  );
  return post;
};
