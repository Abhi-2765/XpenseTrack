import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const { data } = await axios.get("http://localhost:5000/auth/check-auth", {
                    withCredentials: true,
                });

                if (data.status) {
                    setIsLoggedIn(true);
                    setIsVerified(data.verified || false);
                    setEmail(data.email || null);
                } else {
                    setIsLoggedIn(false);
                    setIsVerified(false);
                    setEmail(null);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setIsLoggedIn(false);
                setIsVerified(false);
                setEmail(null);
            } finally {
                setIsLoading(false);
            }
        };

        verifyUser();
    }, []);

    const logout = async () => {
        try {
            await axios.post("http://localhost:5000/auth/logout", {}, {
                withCredentials: true,
            });
            setIsLoggedIn(false);
            setIsVerified(false);
            setEmail(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                isVerified,
                isLoading,
                email,
                setIsLoggedIn,
                setIsVerified,
                setEmail,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
