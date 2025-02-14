import { useContext } from 'react';
import { AppContext } from '../App';

const Sidebar = () => {
  const { isOpen, toggleSidebar, setPage } = useContext(AppContext);

  const handleNavigation = (pageName) => {
    setPage(pageName);
    toggleSidebar();
  };

  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed left-0 h-screen bg-blue-950 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 z-30`}
      >
        <ul className="flex flex-col mt-10">
          <li
            className="text-white font-poppins text-lg px-6 py-4 hover:text-gray-300 cursor-pointer hover:bg-blue-800"
            onClick={() => handleNavigation('home')}
          >
            Home
          </li>
          <li
            className="text-white font-poppins text-lg px-6 py-4 hover:text-gray-300 cursor-pointer hover:bg-blue-800"
            onClick={() => handleNavigation('summary')}
          >
            Summary
          </li>
          <li
            className="text-white font-poppins text-lg px-6 py-4 hover:text-gray-300 cursor-pointer hover:bg-blue-800"
          >
            About
          </li>
        </ul>
      </div>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-20 top-15"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
