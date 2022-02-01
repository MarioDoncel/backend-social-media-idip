import { ValidsRefreshTokenModel } from '../../../database/models/ValidRefreshTokens';

export const deleteRefreshTokenService = async (id: string): Promise<void> => {
  await ValidsRefreshTokenModel.findByIdAndDelete(id);
};
