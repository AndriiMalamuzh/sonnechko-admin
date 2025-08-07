import { IUser } from '@interfaces/user/user.interface';

export interface ILoginResponse {
  user: IUser;
  accessToken: string;
}
