import React, { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { User, UserRole } from "@/types";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,
  });

  const login = useCallback(async (_email: string, _password: string) => {
    setState((s) => ({ ...s, isLoading: true }));
    // TODO: Replace with real API call
    // const res = await fetch(`${API_URL}/auth/login`, { method: 'POST', body: JSON.stringify({ email, password }) });
    // const data = await res.json();
    // setState({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
    setState((s) => ({ ...s, isLoading: false }));
    throw new Error("Backend not connected. Please connect to a real authentication API.");
  }, []);

  const signup = useCallback(async (_name: string, _email: string, _password: string, _role: UserRole) => {
    setState((s) => ({ ...s, isLoading: true }));
    // TODO: Replace with real API call
    setState((s) => ({ ...s, isLoading: false }));
    throw new Error("Backend not connected. Please connect to a real authentication API.");
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, token: null, isAuthenticated: false, isLoading: false });
    // TODO: Clear token from storage, call logout endpoint
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
