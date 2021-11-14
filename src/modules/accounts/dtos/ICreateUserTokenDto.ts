export interface ICreateUserTokenDto {
  id?: string,
  user_id: string;
  expires_date: string;
  refresh_token: string;
}
