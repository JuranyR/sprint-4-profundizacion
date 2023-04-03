import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRouter = ({ children }) => {
  const { isLogged, loading } = useSelector((state) => state.login)

  if (loading) return null;

  return isLogged ? <Navigate to='/' replace /> : <>{children}</>
};

export default PublicRouter;