import { User } from './user';

// ----------------------------------------------------------------------

export interface AuthenticatedUser {
  user: User;
  token: Token;
}

export interface Token {
  expiresIn: number;
  accessToken: string;
}
