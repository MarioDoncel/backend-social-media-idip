import { ObjectId } from 'mongodb';

import { PostModel } from '../../../database/models/Post';

export const likePostService = async (postId: string, userId: ObjectId) => {
  const post = await PostModel.findOneAndUpdate(
    { _id: postId },
    { $push: { likes: userId } },
    { new: true }
  );
  return post;
};
