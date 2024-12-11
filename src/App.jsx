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

export const Context = createContext();

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState('');
  const [isLoggedin, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, async(user) => {
      if(user){
        setPage('home');
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
    })
  }, [])
  

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const value = { isOpen, setIsOpen, page, setPage, isLoggedin, setIsLoggedIn };

  return (
    <Context.Provider value={value}>
      <Navbar toggleSidebar={toggleSidebar} />
      {isLoggedin ? (
        <>
          <Sidebar toggleSidebar={toggleSidebar} />
          <div className="page-content">
            {page === 'home' && <Home />}
            {page === 'summary' && <Summary />}
          </div>
        </>
      ) : (
        <Login />
      )}
      <ToastContainer />
    </Context.Provider>
  );
}

export default App;
