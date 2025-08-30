import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PublicRoute({ children }) {
  const { admin } = useSelector((state) => state.auth);
  if (admin) {
    return <Navigate to="/home" replace />;
  }
  return children;
}
