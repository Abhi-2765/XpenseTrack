import { useState } from 'react';
import './App.css'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import Home from './SidebarPages/Home';
import Summary from './SidebarPages/Summary';
import { ToastContainer, toast } from 'react-toastify';
import Login from './Components/Login';

function App() {

  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState('home');
  const [isLoggedin, setIsLoggedIn] = useState(false);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }


  return (
    <div className='bg-blue-950'>
      <Navbar toggleSidebar = {toggleSidebar}/>
      {isLoggedin  && (<Sidebar toggleSidebar = {toggleSidebar} isOpen = {isOpen} selectPage = {setPage}/>)}
      {!isLoggedin && (<Login/>)}
    </div>
  )
}

export default App
