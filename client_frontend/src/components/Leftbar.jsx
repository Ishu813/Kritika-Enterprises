import { useState } from "react";
import {
  FaHome,
  FaBox,
  FaCogs,
  FaChevronRight,
  FaHandsHelping,
  FaUsers,
} from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";
import { Link } from "react-router-dom";

const Leftbar = () => {
  const [activeMain, setActiveMain] = useState(null);
  const [activeSub, setActiveSub] = useState(null);

  const handleMenuClick = (menu) => {
    if (activeMain === menu) {
      setActiveMain(null);
      setActiveSub(null);
    } else {
      setActiveMain(menu);
    }
  };

  // const handleSubmenuClick = (submenu) => {
  //   if (activeSub === submenu) {
  //     setActiveSub(null);
  //   } else {
  //     setActiveSub(submenu);
  //   }
  // };

  return (
    <div className="bg-[#0f172a]">
      <div
        className="fixed top-20 left-0 h-[calc(100vh-4rem)] shadow-md border-r-2 border-slate-700 z-10 bg-[#0f172a] transition-all duration-300 group hover:w-40 w-12 sm:block"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-4">
          <Link
            to="/"
            className="flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition-colors justify-center group-hover:justify-start"
          >
            <FaHome className="text-lg hover:text-blue-600" />
            <span className="text-sm font-bold group-hover:flex hidden">
              Home
            </span>
          </Link>

          {/* Products Dropdown */}
          <div
            onMouseEnter={() => setActiveMain("products")}
            onMouseLeave={() => setActiveMain(null)}
            onTouchStart={() => handleMenuClick("products")}
            className="relative flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition-colors justify-center group-hover:justify-start"
          >
            <FaBox className="text-lg hover:text-blue-600" />
            <span className="text-sm font-bold group-hover:flex hidden">
              Products <FaChevronRight className="ml-auto" />
            </span>
            {activeMain === "products" && (
              <div className="fixed top-20 left-40 w-32 h-screen bg-[#0f172a] border-r-2 border-slate-700 rounded shadow-md z-[999]">
                {[
                  "Laptops",
                  "Desktops",
                  "Gaming Components",
                  "Printers",
                  "Monitors",
                  "Digital Boards",
                  "Servers",
                  "Softwares",
                  "Storages",
                  "Input Devices",
                ].map((category) => (
                  <Link
                    key={category}
                    to={`/products?category=${category
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Solutions Dropdown */}
          <div
            onMouseEnter={() => setActiveMain("solutions")}
            onMouseLeave={() => {
              setActiveMain(null);
              setActiveSub(null);
            }}
            onTouchStart={() => handleMenuClick("solutions")}
            className="relative flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition-colors justify-center group-hover:justify-start"
          >
            <HiOutlineLightBulb className="text-2xl hover:text-blue-600" />
            <span className="text-sm font-bold group-hover:flex hidden">
              Solutions <FaChevronRight className="ml-auto" />
            </span>
            {activeMain === "solutions" && (
              <div className="fixed top-20 left-40 w-32 h-screen bg-[#0f172a]  border-r-2 border-slate-700  rounded shadow-md z-[999] flex flex-col">
                {["b2b", "b2c"].map((type) => (
                  <div
                    key={type}
                    onMouseEnter={() => setActiveSub(type)}
                    onMouseLeave={() => setActiveSub(null)}
                    className="relative group"
                  >
                    <div
                      className={`px-4 py-2 cursor-pointer flex justify-between ${
                        activeSub === type ? "text-blue-600" : "text-white"
                      } hover:bg-blue-50 hover:text-blue-600`}
                    >
                      {type.toUpperCase()} <FaChevronRight />
                    </div>
                    {activeSub === type && (
                      <div className="fixed top-20 left-[18rem] w-32 h-screen bg-[#0f172a] border-r-2 border-slate-700 rounded shadow-md z-[1000] transition-all duration-75">
                        {[
                          "Laptops",
                          "Desktops",
                          "Gaming Components",
                          "Printers",
                          "Monitors",
                          "Digital Boards",
                          "Servers",
                          "Softwares",
                          "Storages",
                          "Input Devices",
                        ].map((category) => (
                          <Link
                            key={category}
                            to={`/products/${category
                              .toLowerCase()
                              .replace(/ /g, "-")}`}
                            className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                          >
                            {category}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Services */}
          <Link
            to="/services"
            className="flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition-colors justify-center group-hover:justify-start"
          >
            <FaCogs className="text-lg hover:text-blue-600" />
            <span className="text-sm font-bold group-hover:flex hidden">
              Services
            </span>
          </Link>

          {/* Expert Assistance */}
          <Link
            to="/expert-assistance"
            className="flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors justify-center group-hover:justify-start"
          >
            <FaHandsHelping className="text-lg hover:text-blue-600" />
            <span className="text-sm font-bold group-hover:flex hidden">
              Expert Assistance
            </span>
          </Link>

          {/* Our Developers */}
          <Link
            to="/developers"
            className="flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition-colors justify-center group-hover:justify-start"
          >
            <FaUsers className="text-lg hover:text-blue-600" />
            <span className="text-sm font-bold group-hover:flex hidden">
              Our Developers
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
