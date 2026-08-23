import { createContext, useContext, useEffect, useState } from "react";

const SESSION_KEY = "arm_session";
const ACCOUNTS_KEY = "arm_accounts";

const AuthContext = createContext(null);

// Seed a few starter accounts on first run so the app isn't empty,
// but these are stored the same way as any account a user creates.
const SEED_ACCOUNTS = [
  { email: "risk@demo.com", name: "Riley Chen", role: "analyst" },
  { email: "manager@demo.com", name: "Morgan Blake", role: "manager" },
  { email: "admin@demo.com", name: "Admin User", role: "admin" },
];

async function hashPassword(password) {
  const enc = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function loadAccounts() {
  try {
    const raw = localStorage.getItem(ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveAccounts(accounts) {
  localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

async function seedIfEmpty() {
  const existing = loadAccounts();
  if (existing) return existing;
  const seeded = [];
  for (const acc of SEED_ACCOUNTS) {
    seeded.push({
      id: acc.email,
      email: acc.email,
      name: acc.name,
      role: acc.role,
      passwordHash: await hashPassword("password123"),
      createdAt: new Date().toISOString(),
    });
  }
  saveAccounts(seeded);
  return seeded;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    seedIfEmpty().then(() => setReady(true));
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    else localStorage.removeItem(SESSION_KEY);
  }, [user]);

  async function signup({ name, email, password, role }) {
    const key = email.trim().toLowerCase();
    if (!name.trim()) return { ok: false, error: "Please enter your full name." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(key)) return { ok: false, error: "Please enter a valid email address." };
    if (password.length < 8) return { ok: false, error: "Password must be at least 8 characters." };

    const accounts = loadAccounts() || [];
    if (accounts.some((a) => a.email === key)) {
      return { ok: false, error: "An account with this email already exists." };
    }

    const passwordHash = await hashPassword(password);
    const newAccount = {
      id: key,
      email: key,
      name: name.trim(),
      role: role || "analyst",
      passwordHash,
      createdAt: new Date().toISOString(),
    };
    saveAccounts([...accounts, newAccount]);

    const sessionUser = { id: newAccount.id, name: newAccount.name, email: newAccount.email, role: newAccount.role };
    setUser(sessionUser);
    return { ok: true, user: sessionUser };
  }

  async function login(email, password) {
    const key = email.trim().toLowerCase();
    const accounts = loadAccounts() || [];
    const account = accounts.find((a) => a.email === key);
    if (!account) return { ok: false, error: "No account found for that email." };

    const hash = await hashPassword(password);
    if (hash !== account.passwordHash) {
      return { ok: false, error: "Incorrect password." };
    }

    const sessionUser = { id: account.id, name: account.name, email: account.email, role: account.role };
    setUser(sessionUser);
    return { ok: true, user: sessionUser };
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, ready }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
