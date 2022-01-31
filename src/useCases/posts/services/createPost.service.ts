import { PostModel } from '../../../database/models/Post';
import { ICreatePostDto } from '../dtos/CreatePostDto';

export const createPostService = async ({
  userId,
  text,
  image = '',
}: ICreatePostDto) => {
  const post = PostModel.create({
    userId,
    text,
    image,
  });
  return post;
};
