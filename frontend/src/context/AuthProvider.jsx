import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [mcpAPI, setMcpAPI] = useState(null);
    const [email, setEmail] = useState(null);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/auth/check-auth`, {
                    withCredentials: true,
                });

                if (data.status) {
                    setIsLoggedIn(true);
                    setIsVerified(data.verified || false);
                    setMcpAPI(data.mcpAPI || null);
                    setEmail(data.email || null);
                } else {
                    setIsLoggedIn(false);
                    setIsVerified(false);
                    setMcpAPI(null);
                    setEmail(null);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setIsLoggedIn(false);
                setIsVerified(false);
                setMcpAPI(null);
                setEmail(null);
            } finally {
                setIsLoading(false);
            }
        };

        verifyUser();
    }, []);

    const logout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
                withCredentials: true,
            });
            setIsLoggedIn(false);
            setIsVerified(false);
            setMcpAPI(null);
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
                mcpAPI,
                email,
                setIsLoggedIn,
                setIsVerified,
                setMcpAPI,
                setEmail,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
