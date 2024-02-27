export interface IAuth {
  id: number;
  username: string;
  full_name: string;
  email: string;
  profile_picture?: string;
  profile_description?: string;
}

export interface IRegister {
  full_name: string;
  username: string;
  email: string;
  password: string;
}

export interface ILogin {
  username: string;
  password: string;
}

export interface IUserSearch {
  id: number;
  username: string;
  full_name: string;
  bio: string;
  profile_picture?: string;
}
