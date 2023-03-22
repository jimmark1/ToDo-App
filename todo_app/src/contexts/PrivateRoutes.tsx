import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const PrivateRoutes = () => {
     let authContext = useContext(AuthContext);
     console.log(authContext?.user);
     return !authContext?.user ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoutes;
