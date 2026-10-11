import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { mockAuthService } from "../services/mockAuthService";
import type { LoginInput, RegisterInput, User } from "../types";
type AuthContextValue = {
  user: User | null;
  login(input: LoginInput): Promise<void>;
  register(input: RegisterInput): Promise<void>;
  logout(): Promise<void>;
};
const AuthContext = createContext<AuthContextValue | null>(null);
export function AuthProvider({ children }: { children: ReactNode }) {
  // Deliberately in-memory: a refresh signs out in demo mode; no fake security claims.
  const [user, setUser] = useState<User | null>(null);
  const login = useCallback(
    async (input: LoginInput) => setUser(await mockAuthService.login(input)),
    []
  );
  const register = useCallback(
    async (input: RegisterInput) =>
      setUser(await mockAuthService.register(input)),
    []
  );
  const logout = useCallback(async () => {
    await mockAuthService.logout();
    setUser(null);
  }, []);
  const value = useMemo(
    () => ({ user, login, register, logout }),
    [user, login, register, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
