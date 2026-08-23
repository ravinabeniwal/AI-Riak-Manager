import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { AuthUser, Role } from "../types";

const DEMO_ACCOUNTS: Record<string, { password: string; name: string; role: Role }> = {
  "risk@demo.com": { password: "password123", name: "Riley Chen", role: "analyst" },
  "manager@demo.com": { password: "password123", name: "Morgan Blake", role: "manager" },
  "admin@demo.com": { password: "password123", name: "Admin User", role: "admin" },
};

interface AuthContextValue {
  user: AuthUser | null;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);
const STORAGE_KEY = "arm_session";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  function login(email: string, password: string) {
    const key = email.trim().toLowerCase();
    const account = DEMO_ACCOUNTS[key];
    if (!account || account.password !== password) {
      return { ok: false, error: "Invalid email or password." };
    }
    setUser({ id: key, name: account.name, email: key, role: account.role });
    return { ok: true };
  }

  function logout() {
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
