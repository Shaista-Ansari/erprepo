import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, userRole } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" replace />;
}