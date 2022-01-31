import mongoose, { Schema } from 'mongoose';

import { IUser } from '../../interfaces/User';

const schema = new mongoose.Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    telephone: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    emailVerified: { type: Boolean, required: true, default: false },
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

export const UserModel = mongoose.model<IUser>('users', schema);
