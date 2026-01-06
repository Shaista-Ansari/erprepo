import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {

  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("auth_token")
  );

  const [userRole, setUserRole] = useState(
    localStorage.getItem("user_role")
  );

  const login = (token, role) => {
    localStorage.setItem("auth_token", token);
    localStorage.setItem("user_role", role);
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_role");
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
