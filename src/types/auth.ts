import { User } from './user';

// ----------------------------------------------------------------------

export interface SignIn {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  user: User;
  token: Token;
}

export interface Token {
  expiresIn: number;
  accessToken: string;
}
