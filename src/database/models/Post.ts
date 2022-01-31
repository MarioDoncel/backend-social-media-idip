import { ObjectId } from 'mongodb';
import mongoose, { Schema } from 'mongoose';

import { IPost } from '../../interfaces/Post';

const schema = new mongoose.Schema<IPost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    text: { type: String, required: true, maxlength: 500 },
    image: { type: String },
    comments: [
      {
        text: { type: String, maxlength: 150 },
        user: {
          type: Schema.Types.ObjectId,
          ref: 'users',
        },
        createdAt: { type: Date, default: Date.now },
      },
    ],
    likes: { type: [ObjectId], ref: 'users' },
  },
  {
    timestamps: true,
  }
);

export const PostModel = mongoose.model<IPost>('posts', schema);
