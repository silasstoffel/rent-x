export interface ICreateUserTokenDto {
  id?: string,
  user_id: string;
  expires_date: Date;
  refresh_token: string;
}
