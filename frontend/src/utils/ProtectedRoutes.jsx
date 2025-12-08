import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loading from "../components/Loading";

const ProtectedRoutes = () => {
    const { isLoggedIn, isVerified, isLoading } = useAuth();

    if (isLoading) return <Loading />;

    if (!isLoggedIn) return <Navigate to="/signup" replace />;
    if (!isVerified) return <Navigate to="/verify-otp" replace />;

    return <Outlet />;
};

export default ProtectedRoutes;
