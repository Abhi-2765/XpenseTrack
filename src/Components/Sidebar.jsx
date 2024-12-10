import React from 'react';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Sidebar */}
      <div
        className={`fixed left-0 h-screen bg-blue-950 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 z-30`}
      >
        <ul className="flex flex-col mt-10">
          <li className="text-white font-poppins text-lg px-6 py-4 hover:text-gray-300 cursor-pointer hover:bg-blue-800">
            Home
          </li>
          <li className="text-white font-poppins text-lg px-6 py-4 hover:text-gray-300 cursor-pointer  hover:bg-blue-800">
            Summary
          </li>
          <li className="text-white font-poppins text-lg px-6 py-4 hover:text-gray-300 cursor-pointe  hover:bg-blue-800">
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
