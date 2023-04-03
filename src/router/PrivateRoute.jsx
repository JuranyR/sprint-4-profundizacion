import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ isLogged }) => {
  return isLogged ? <Outlet /> : <Navigate to='/loginPhone' />
};

export default PrivateRoute;
