export interface AuthData {
  accessToken: string;
  user: {
    id: number;
    name: string;
    surname: string;
    email: string;
  };
}

export interface SignupData {
  name: string;
  surname: string;
  email: string;
  password: string;
}
