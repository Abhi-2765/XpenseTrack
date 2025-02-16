import { useState, useContext, createContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [User, setUser] = useState(null);
    const [Login, setLogin] = useState(false);
    const [date, setDate] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [page, setPage] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [LoadError, setLoadError] = useState(null);

    const toggleSidebar = () => setIsOpen(prev => !prev);

    const value = {
        User,
        setUser,
        Login,
        setLogin,
        date,
        setDate,
        isOpen,
        setIsOpen,
        page,
        setPage,
        toggleSidebar,
        transactions,
        setTransactions,
        LoadError,
        setLoadError
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => useContext(UserContext);
