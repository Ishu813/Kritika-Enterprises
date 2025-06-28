import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { FiShoppingCart } from "react-icons/fi";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState();
  const [isLogoutDropdownOpen, setIsLogoutDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log("User is authenticated");
        // You can access user.uid, user.email, etc.
      } else {
        setCurrentUser("");
        console.log("No user is authenticated");
      }
    });
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("Logged out!");
        // Optionally redirect or update context/state
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });

    window.location.href = "/";
  };

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
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && searchTerm.trim() !== "") {
                  navigate(`/products/${searchTerm}`);
                }
              }}
              className="w-full max-w-md px-4 py-2 rounded-md bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Right part */}
          <div className="hidden md:flex items-center gap-6">
            {!currentUser ? (
              <>
                <NavLink
                  to="/login"
                  className="text-sm font-medium hover:underline"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-sm font-medium bg-blue-600 px-4 py-1.5 rounded-md hover:bg-blue-700"
                >
                  SignUp
                </NavLink>
              </>
            ) : (
              <>
                <NavLink to="/cart" className="text-white hover:text-blue-400">
                  <FiShoppingCart size={22} />
                </NavLink>
                <NavLink
                  // to="/profile"
                  onClick={() => setIsLogoutDropdownOpen(!isLogoutDropdownOpen)}
                >
                  <img
                    alt="user"
                    className="w-9 h-9 rounded-full object-cover border-2 border-blue-400"
                  />
                </NavLink>
              </>
            )}
            {isLogoutDropdownOpen && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  backgroundColor: "#0f172a",
                  padding: "1rem",
                  height: "6rem",
                  width: "8rem",
                  position: "absolute",
                  border: "1px solid #1e293b",
                  top: "4rem",
                  right: "2rem",
                  color: "white",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <NavLink
                  to="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 hover:text-blue-400"
                >
                  Profile
                </NavLink>
                <NavLink
                  onClick={() => {
                    setIsLogoutDropdownOpen(false);
                    handleLogout();
                  }}
                  className="block py-2 hover:text-blue-400"
                >
                  Logout
                </NavLink>
              </div>
            )}
          </div>

          {/* Hamburger - Mobile only */}
          <div
            className="md:hidden text-3xl cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-[#0f172a] z-50 border-t border-slate-700 text-white text-center py-4">
          {!currentUser ? (
            <>
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 hover:text-blue-400"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 hover:text-blue-400"
              >
                SignUp
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/cart"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 hover:text-blue-400"
              >
                Cart
              </NavLink>
              <NavLink
                // to="/profile"
                onClick={() => setIsMenuOpen(false)}
                className="block py-2 hover:text-blue-400"
              >
                Profile
              </NavLink>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;
