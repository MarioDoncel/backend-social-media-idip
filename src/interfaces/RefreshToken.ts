export interface IRefreshToken {
  id?: string;
  secret: string;
  accessId: string;
  expiresIn: number;
}
