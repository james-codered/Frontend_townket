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

  const login = useCallback(async (email: string, password: string) => {
  setState((s) => ({ ...s, isLoading: true }));

  try {
    const res = await fetch("https://townketbackend.onrender.com/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: name, 
     email, password, role }),
      )};
    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    setState({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      isLoading: false,
    });

  } catch (error: any) {
    setState((s) => ({ ...s, isLoading: false }));
    throw new Error(error.message);
  }
}, []);

  const signup = useCallback(async (name: string, email: string, password: string, role: UserRole) => {
  setState((s) => ({ ...s, isLoading: true }));

  try {
    const res = await fetch("https://townketbackend.onrender.com/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Signup failed");
    }

    setState({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
      isLoading: false,
    });

  } catch (error: any) {
    setState((s) => ({ ...s, isLoading: false }));
    throw new Error(error.message);
  }
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
