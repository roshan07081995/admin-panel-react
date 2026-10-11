export type User = { id: string; name: string; email: string };
export type LoginInput = { email: string; password: string };
export type RegisterInput = { name: string; email: string; password: string };
export type AuthService = {
  login(input: LoginInput): Promise<User>;
  register(input: RegisterInput): Promise<User>;
  resetPassword(email: string): Promise<void>;
  logout(): Promise<void>;
};
