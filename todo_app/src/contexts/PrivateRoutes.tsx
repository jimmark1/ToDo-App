import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
     const Authenticated = true;

     return !Authenticated ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoutes;
