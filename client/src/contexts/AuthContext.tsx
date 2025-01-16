import React, { createContext, useState, useEffect } from "react";

interface AuthContextType {
    isLoggedIn: boolean;
    login: (token: string, user: object) => void;
    logout: () => void;
}

// Provide default values for the context
const defaultAuthContext: AuthContextType = {
    isLoggedIn: false,
    login: () => {
        console.warn("AuthContext.login() is not initialized.");
    },
    logout: () => {
        console.warn("AuthContext.logout() is not initialized.");
    },
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if the user is logged in on app load
    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsLoggedIn(!!token); // Convert token existence to boolean
    }, []);

    const login = (token: string, user: object) => {
        localStorage.setItem("authToken", token);
        localStorage.setItem("user", JSON.stringify(user));
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
