import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loading from "../components/Loading";

const PublicRoutes = () => {
    const { isLoggedIn, isVerified, isLoading } = useAuth();
    if (isLoading) return <Loading />;

    if (isLoggedIn && isVerified) return <Navigate to="/dashboard" replace />;

    if (isLoggedIn && !isVerified) return <Navigate to="/verify-otp" replace />;

    return <Outlet />;
};

export default PublicRoutes;
