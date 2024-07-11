export interface User {
  userId: string;
  fullName: string;
  email: string;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}
