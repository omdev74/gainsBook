import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (token: string, user: object) => void;
  logout: () => void;
  validateToken: () => void; // Optional re-validation method
  token: string
}

// Default values for the context
const defaultAuthContext: AuthContextType = {
  isLoggedIn: false,
  login: () => console.warn("AuthContext.login() is not initialized."),
  logout: () => console.warn("AuthContext.logout() is not initialized."),
  validateToken: () => console.warn("AuthContext.validateToken() is not initialized."),
  token: ""
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  // Helper function to check if a token is expired
  const isTokenExpired = (token: string): boolean => {
    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      const now = Math.floor(Date.now() / 1000);
      return exp < now;
    } catch (error) {
      return true;
    }
  };

  // Validate token on app load
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      if (isTokenExpired(token)) {
        console.log("Token expired. Logging out...");
        logout();
      } else {
        setIsLoggedIn(true);
        setToken(token);

      }
    }
  }, []); // Run only on initial load

  const login = (token: string, user: object) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setToken("");
  };

  const validateToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      if (isTokenExpired(token)) {
        console.log("Token expired during validation. Logging out...");
        logout();
      } else {
        setIsLoggedIn(true);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, validateToken, token }}>
      {children}
    </AuthContext.Provider>
  );
};
