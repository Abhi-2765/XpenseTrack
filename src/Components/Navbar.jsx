import React, { useState } from 'react';
import logo from '../assets/xpensetrack-logo.png';
import { logout } from '../Configure/firebase';

const Navbar = ({toggleSidebar}) => {
  return (
    <div className='z-50'>
      <div className="flex flex-row justify-between items-center max-h-12 bg-blue-950 px-4 py-2 border-b-2">
        {/* Menu button and logo */}
        <div className="flex flex-row items-center gap-2 py-1">
            
          <button
            data-ripple-light="true"
            data-tooltip-target="tooltip"
            className="select-none rounded-lg bg-transparent p-2 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md transition-all hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50"
            onClick={toggleSidebar}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <img src={logo} alt="XpenseTrack Logo" className="h-10" />
        </div>

        {/* Profile icon */}
        <div onClick={logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
