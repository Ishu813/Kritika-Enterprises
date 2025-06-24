import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoMdClose } from 'react-icons/io';
import { FiShoppingCart } from 'react-icons/fi';

const Navbar = ({ isAuthenticated, user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0f172a] text-white shadow-md border-b border-slate-700 px-4 md:px-8 lg:px-16 h-20">
        <div className="flex items-center justify-between h-full">

          <NavLink to="/" className="text-2xl font-bold text-blue-500">
            Kri<span className="text-white">tika</span> Enterprises
          </NavLink>

        
          <div className="hidden md:flex flex-1 justify-center px-6">
            <input
              type="text"
              placeholder="Search..."
              className="w-full max-w-md px-4 py-2 rounded-md bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        {/* Right part */}
          <div className="hidden md:flex items-center gap-6">
            {!isAuthenticated ? (
              <>
                <NavLink to="/login" className="text-sm font-medium hover:underline">
                  Login
                </NavLink>
                <NavLink to="/signup" className="text-sm font-medium bg-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-700">
                  SignUp
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/cart" className="text-white hover:text-blue-400">
                  <FiShoppingCart size={22} />
                </NavLink>
                <NavLink to="/profile">
                  <img
                    src={''}
                    alt="user"
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-400"
                  />
                </NavLink>
              </>
            )}
          </div>

         
          <div className="md:hidden text-3xl cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </div>
        </div>
      </nav>

     
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0f172a] z-50 border-t border-slate-700 text-white text-center py-4">
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-blue-400">Login</NavLink>
              <NavLink to="/signup" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-blue-400">SignUp</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/cart" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-blue-400">Cart</NavLink>
              <NavLink to="/profile" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-blue-400">Profile</NavLink>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
