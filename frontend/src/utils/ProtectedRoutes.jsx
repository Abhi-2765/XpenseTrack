import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Loading from "../components/Loading";

const ProtectedRoutes = () => {
    const { isLoggedIn, isVerified, isLoading } = useAuth();

    if (isLoading) return <Loading />; // wait for auth check

    if (!isLoggedIn) return <Navigate to="/signup" replace />; // not logged in → login
    if (!isVerified) return <Navigate to="/verify-otp" replace />; // logged in but not verified

    return <Outlet />; // user is authenticated (and verified)
};

export default ProtectedRoutes;
