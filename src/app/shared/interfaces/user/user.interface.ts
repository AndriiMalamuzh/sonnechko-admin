export interface IUser {
  _id: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  role: 'user' | 'admin';
  credentials: string[];
  date_created: number;
  date_updated: number;
}
