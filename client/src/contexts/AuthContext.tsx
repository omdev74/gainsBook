import React, { createContext, useState, useEffect } from "react";
import {jwtDecode} from "jwt-decode";
import { User } from "@shared/types/frontend";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  validateToken: () => void;
  token: string | null;
  user: User | null;
  loading: boolean;
}

// Default values for the context
const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  login: () => console.warn("AuthContext.login() is not initialized."),
  logout: () => console.warn("AuthContext.logout() is not initialized."),
  validateToken: () => console.warn("AuthContext.validateToken() is not initialized."),
  token: null,
  user: null,
  loading: true,
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Helper function to check if a token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (error) {
      console.error("Invalid token:", error);
      return true;
    }
  };

  // Validate token on app load
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && !isTokenExpired(storedToken)) {
      setToken(storedToken);
      setUser(storedUser ? JSON.parse(storedUser) : null);
      setIsLoggedIn(true);
    } else if (storedToken) {
      console.log("Token expired on app load. Logging out...");
      logout();
    }

    setLoading(false); // Authentication check completed
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setToken(token);
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsLoggedIn(false);
  };

  const validateToken = () => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken && !isTokenExpired(storedToken)) {
      setIsLoggedIn(true);
    } else {
      console.log("Token expired during validation. Logging out...");
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        validateToken,
        token,
        user,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
