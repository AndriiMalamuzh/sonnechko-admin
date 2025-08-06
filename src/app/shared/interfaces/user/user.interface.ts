export interface IUser {
  _id: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  credentials: string[];
  date_created: number;
  date_updated: number;
}
