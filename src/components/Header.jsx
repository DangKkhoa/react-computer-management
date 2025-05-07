import React, { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { NavLink } from 'react-router';

import { ChevronDown, LogOut, Settings } from 'lucide-react';


const Header = ({ title, children }) => {
  const { user, logout } = useContext(AuthContext);

  const [isDropDownOpened, setIsDropDownOpened] = useState(false);

  const handleDropDownToggle = () => {
    setIsDropDownOpened(!isDropDownOpened);
    console.log("Dropdown toggled", isDropDownOpened);
  }
  return (
    <header className='w-full p-5 shadow-md border-b border-gray-300 flex justify-between items-center'>
      <h1 className='text-3xl font-bold'>{title}</h1>
      <div className='flex items-center'>
        {children}
        {user && (
          <span className='text-gray-800 text-lg ml-4'>
            Welcome, {user.firstname + " " + user.lastname}
          </span>
        )}

        <div className='relative ml-4'>
          <button onClick={handleDropDownToggle}>
            <ChevronDown />
          </button>
          {isDropDownOpened && <div className={`absolute z-10000 right-0 top-10 bg-white shadow-lg border border-gray-300 px-4 py-4 ${isDropDownOpened ? "block" : "hidden"}`}>
            <NavLink to="/settings" className='flex items-center px-4 py-2 hover:bg-gray-200 text-lg'><Settings /> <span className='ml-4'>Settings</span></NavLink>
            <NavLink onClick={logout} className='flex items-center px-4 py-2 hover:bg-gray-200 text-lg'><LogOut /> <span className='ml-4'>Logout</span></NavLink>
          </div>}
          
        </div>

      </div>
    </header>
  )
}

export default Header