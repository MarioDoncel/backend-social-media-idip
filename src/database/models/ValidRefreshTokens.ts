import mongoose from 'mongoose';

import { IRefreshToken } from '../../interfaces/RefreshToken';

const schema = new mongoose.Schema<IRefreshToken>({
  accessId: { type: String, required: true },
  secret: { type: String, required: true },
  expiresIn: { type: Number, required: true },
});

export const ValidsRefreshTokenModel = mongoose.model<IRefreshToken>(
  'refreshTokens',
  schema
);
