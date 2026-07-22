"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);

        setToken(storedToken);
        setUser(parsedUser);

        api.defaults.headers.common.Authorization = `Bearer ${storedToken}`;
      } catch (error) {
        console.error("Invalid user data in localStorage:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        delete api.defaults.headers.common.Authorization;
      }
    }

    setLoading(false);
  }, []);

  // Login
  const login = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);

    localStorage.setItem("token", jwtToken);
    localStorage.setItem("user", JSON.stringify(userData));

    api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
  };

  // Update Profile
  const updateUser = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  // Logout
  const logout = () => {
    setUser(null);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    delete api.defaults.headers.common.Authorization;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};