export interface ILoginUser {
  email: string,
  password: string,
}

export interface IUsersService {
  findUser(email: string, password: string): Promise<IUserTable | null>
}

export interface IUserTable {
  id?: number;
  username: string;
  role: string;
  email: string;
  password: string;
}
