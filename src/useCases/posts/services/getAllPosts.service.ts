import { PostModel } from '../../../database/models/Post';
import { IPost } from '../../../interfaces/Post';

export const getAllPostsService = async (): Promise<IPost[]> => {
  const posts: IPost[] = await PostModel.find();
  return posts;
};
