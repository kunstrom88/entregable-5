import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "./layout/Header";
const ProtectedRoutes = () => {
  const trainer = useSelector((state) => state.trainer);

  if (trainer) {
    return (
      <>
        <Header />
        <Outlet />;
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
