import { ValidsRefreshTokenModel } from '../database/models/ValidRefreshTokens';

export const deleteExpiredRefreshTokens = async () => {
  try {
    const deleted = await ValidsRefreshTokenModel.deleteMany({
      expiresIn: { $lte: Date.now() },
    });
    console.log(deleted);
  } catch (error) {
    console.log(error);
  }
};
