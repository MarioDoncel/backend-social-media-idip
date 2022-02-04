/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
import mongoose, { Schema } from 'mongoose';

import { IUser } from '../../interfaces/User';
import { PostModel } from './Post';

const schema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    telephone: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    emailVerified: { type: Boolean, required: true, default: true },
    password: { type: String, required: true },
    profileImage: {
      type: String,
      required: true,
      default: 'https://via.placeholder.com/150',
    },
    followings: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    ],
    postsTenLast: [
      {
        postId: { type: Schema.Types.ObjectId, ref: 'posts' },
        createdAt: { type: Date, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

schema.post('remove', async function (next) {
  await this.model('users').findOneAndUpdate(
    { followings: this._id },
    { $pull: { followings: this._id } }
  );
  await this.model('users').findOneAndUpdate(
    { followers: this._id },
    { $pull: { followers: this._id } }
  );
  await PostModel.findOneAndDelete({ userId: this._id });
  await PostModel.findOneAndUpdate(
    { comments: { userId: this._id } },
    { $pull: { comments: { userId: this._id } } }
  );
  await PostModel.findOneAndUpdate(
    { likes: this._id },
    { $pull: { likes: this._id } }
  );
  next();
});

export const UserModel = mongoose.model<IUser>('users', schema);
