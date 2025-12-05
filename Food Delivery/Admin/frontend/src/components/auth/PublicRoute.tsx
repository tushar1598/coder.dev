import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./auth";
import type { JSX } from "react";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;
