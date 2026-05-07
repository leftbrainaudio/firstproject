"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("ds_user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  async function login(email: string, _password: string) {
    const u = { email, name: email.split("@")[0] };
    localStorage.setItem("ds_user", JSON.stringify(u));
    setUser(u);
    router.push("/dashboard");
  }

  async function signup(name: string, email: string, _password: string) {
    const u = { email, name };
    localStorage.setItem("ds_user", JSON.stringify(u));
    setUser(u);
    router.push("/dashboard");
  }

  function logout() {
    localStorage.removeItem("ds_user");
    setUser(null);
    router.push("/");
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
