import { PostModel } from '../../../database/models/Post';

export const deletePostByIdService = async (id: string) => {
  await PostModel.findByIdAndDelete(id);
};
