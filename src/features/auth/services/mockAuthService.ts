import type { AuthService, User } from "../types";
const wait = (ms = 650) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));
const DEMO_EMAIL = "demo@northstar.dev";
const DEMO_PASSWORD = "Password123!";
const demoUser: User = { id: "demo-1", name: "Alex Morgan", email: DEMO_EMAIL };
/** Demo-only behavior. No passwords are persisted and no server authentication occurs. */
export const mockAuthService: AuthService = {
  async login({ email, password }) {
    await wait();
    if (
      email.trim().toLowerCase() !== DEMO_EMAIL ||
      password !== DEMO_PASSWORD
    ) {
      throw new Error("Invalid email or password.");
    }
    return demoUser;
  },
  async register({ name, email }) {
    await wait();
    return {
      id: `mock-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
    };
  },
  async resetPassword() {
    await wait();
  },
  async logout() {
    await wait(180);
  },
};
