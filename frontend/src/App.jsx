import { createContext, useEffect, useState } from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Home from './SidebarPages/Home';
import Summary from './SidebarPages/Summary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Configure/firebase';

export const AppContext = createContext();

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState('');
  const [isLoggedin, setIsLoggedIn] = useState(false);
  const [User, setUser] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
        setUser(user.uid);
        setPage('home');
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    })
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const value = { isOpen, setIsOpen, page, setPage, isLoggedin, setIsLoggedIn, toggleSidebar, User };

  

  return (
    <AppContext.Provider value={value}>
      <Navbar />
      {isLoggedin ? (
        <>
          <Sidebar />
          <div className="page-content">
            {page === 'home' && <Home />}
            {page === 'summary' && <Summary />}
          </div>
        </>
      ) : (
        <Login user={User} />
      )}
      <ToastContainer />
    </AppContext.Provider>
  );
}

export default App;


