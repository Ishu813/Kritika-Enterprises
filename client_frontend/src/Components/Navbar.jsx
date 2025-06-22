import React, { useState } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setisMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed p-4 w-[100%] px-4 md:px-8 lg:px-16 h-20 bg-[#0f172a] text-[#4c7bbe] border-b shadow-sm z-50">
        <div className="flex h-full items-center justify-between">
          {/* Left - Logo */}
          <NavLink to="/" className="text-2xl font-bold text-blue-700">
            Kri<span className="text-white">tika</span> Enterprises
          </NavLink>

          {/* Center - Search Bar (hidden on small screens) */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-md px-4 py-2 rounded-md border bg-slate-700 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Right - Login + SignUp */}
          <div className="hidden md:flex items-center gap-4">
            <NavLink to="/Login" className="text-sm font-medium text-white hover:underline">
              Login
            </NavLink>
            <NavLink to="/SignUp" className="text-sm font-medium bg-[#2563eb] text-white px-4 py-1.5 rounded-md hover:bg-[#2563eb]">
              SignUp
            </NavLink>
          </div>

          {/* Hamburger - Mobile only */}
          <div className="md:hidden text-3xl cursor-pointer" onClick={() => setisMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </div>
        </div>
      </nav>

      {/* Mobile dropdown list */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0f172a] border-t border-gray-200 z-50">
          <div className="flex flex-col gap-4 px-6 py-4 text-lg font-semibold text-center">
            <NavLink
              to="/Login"
              onClick={() => setisMenuOpen(false)}
              className={({ isActive }) =>
                `text-white ${isActive ? 'underline' : ''} hover:text-blue-400`
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/SignUp"
              onClick={() => setisMenuOpen(false)}
              className={({ isActive }) =>
                `text-white ${isActive ? 'underline' : ''} hover:text-blue-400`
              }
            >
              SignUp
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;