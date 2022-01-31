import { ObjectId } from 'mongodb';

import { PostModel } from '../../../database/models/Post';

export const dislikePostService = async (postId: string, userId: ObjectId) => {
  const post = await PostModel.findOneAndUpdate(
    { _id: postId },
    { $pull: { likes: userId } },
    { new: true }
  );
  return post;
};
