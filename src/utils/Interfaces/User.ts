export interface UserCreation {
  name: string;
  email: string;
  role: number;
  description: string;
  password: string;
  career: number;
}

export interface UserLogIn {
  email: string;
  password: string;
}

export interface UpdateUser {
  description: string;
  role: number;
  userCognito: any;
}
