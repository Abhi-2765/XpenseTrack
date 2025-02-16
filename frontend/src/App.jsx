import { useEffect } from 'react';
import Navbar from './Components/Navbar';
import Sidebar from './Components/Sidebar';
import Home from './SidebarPages/Home';
import Summary from './SidebarPages/Summary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Configure/firebase';
import { useUserContext } from './Context/UserProvider.jsx';

function App() {
  const {page, setPage, Login: isLoggedin, setLogin, setUser, User } = useUserContext();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user.uid);
        setPage('home');
        setLogin(true); // Update login state
      } else {
        setLogin(false);
      }
    });
  }, [setUser, setPage, setLogin]);

  return (
    <>
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
    </>
  );
}

export default App;

