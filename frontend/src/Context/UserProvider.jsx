import { useState, useContext, createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(null);
    const [Login, setLogin] = useState(false);
    const [date, setDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState("");

    const toggleSidebar = () => setIsOpen(prev => !prev);

    const value = {
        userId,
        setUserId,
        Login,
        setLogin,
        date,
        setDate,
        isOpen,
        setIsOpen,
        page,
        setPage,
        toggleSidebar,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
