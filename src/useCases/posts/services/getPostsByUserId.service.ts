import { PostModel } from '../../../database/models/Post';
import { IPost } from '../../../interfaces/Post';

export const getPostsByUserIdService = async (userId: string) => {
  const posts: IPost[] = await PostModel.find({ userId });
  return posts;
};
