import { PostModel } from '../../../database/models/Post';
import { IPost } from '../../../interfaces/Post';

export const findPostByIdService = async (id: string) => {
  const post: IPost | null = await PostModel.findById(id);
  return post;
};
