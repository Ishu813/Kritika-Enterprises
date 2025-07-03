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
  const [activeMain, setActiveMain] = useState(null); // "products" | "solutions" | null
  const [activeSub, setActiveSub] = useState(null); // "b2b" | "b2c" | null

  const handleMenuClick = (menu) => {
    if (activeMain === menu) {
      setActiveMain(null);
      setActiveSub(null);
    } else {
      setActiveMain(menu);
    }
  };

  const handleSubmenuClick = (submenu) => {
    if (activeSub === submenu) {
      setActiveSub(null);
    } else {
      setActiveSub(submenu);
    }
  };

  return (
    // The sidebar is hidden on small screens, visible on sm and up
    <div className="bg-[#0f172a]">
      <div
        className="fixed top-20 left-0 h-[calc(100vh-4rem)] border-r-2 border-slate-700 z-10 bg-[#0f172a] transition-all duration-300 group hover:w-40 w-12 sm:block"
        onClick={(e) => {
          e.stopPropagation();
        }}
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
            onClick={() => handleMenuClick("products")}
            className="relative flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition-colors justify-center group-hover:justify-start"
          >
            <FaBox className="text-lg hover:text-blue-600" />
            <span className="text-sm font-bold  items-center justify-between w-full group-hover:flex hidden">
              Products <FaChevronRight className="ml-auto" />
            </span>
            {activeMain === "products" && (
              <div className="fixed top-20 left-40 w-32 h-screen bg-[#0f172a] border  border-slate-700 rounded shadow-md z-[999]">
                <Link
                  to="/products/laptops"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                >
                  Laptops
                </Link>
                <Link
                  to="/products/desktops"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                >
                  Desktops
                </Link>
                <Link
                  to="/products/gaming-components"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                >
                  Gaming Components
                </Link>
                <Link
                  to="/products/printers"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                >
                  Printers
                </Link>
                <Link
                  to="/products/monitors"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                >
                  Monitors
                </Link>
                <Link
                  to="/products/digital-boards"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                >
                  Digital Boards
                </Link>
                <Link
                  to="/products/servers"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                >
                  Servers
                </Link>
                <Link
                  to="/products/softwares"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                >
                  Softwares
                </Link>
                <Link
                  to="/products/storages"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                >
                  Storages
                </Link>
                <Link
                  to="/products/input-devices"
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                >
                  Input Devices
                </Link>
              </div>
            )}
          </div>

          {/* Solutions Dropdown with B2B/B2C submenus */}
          <div
            onMouseEnter={() => setActiveMain("solutions")}
            onMouseLeave={() => {
              setActiveMain(null);
              setActiveSub(null);
            }}
            onClick={() => handleMenuClick("solutions")}
            className="relative flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition-colors justify-center group-hover:justify-start"
          >
            <HiOutlineLightBulb className="text-2xl  hover:text-blue-600" />
            <span className="text-sm font-bold items-center justify-between w-full group-hover:flex hidden">
              Solutions <FaChevronRight className="ml-auto" />
            </span>
            {activeMain === "solutions" && (
              <div className="fixed top-20 left-40 w-32 h-screen bg-[#0f172a] border  border-slate-700 rounded shadow-md z-[999] flex flex-col">
                <div
                  onMouseEnter={() => setActiveSub("b2b")}
                  onMouseLeave={() => setActiveSub(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmenuClick("b2b");
                  }}
                  className="relative"
                >
                  <div
                    className={`px-4 py-2 cursor-pointer flex justify-between ${
                      activeSub === "b2b" ? "text-blue-600" : "text-white"
                    } hover:bg-blue-50 hover:text-blue-600`}
                  >
                    B2B <FaChevronRight />
                  </div>
                  {activeSub === "b2b" && (
                    <div className="fixed top-20 left-[18rem] w-32 h-screen bg-[#0f172a] border  border-slate-700 rounded shadow-md z-[1000]">
                      <Link
                        to="/products/laptops"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Laptops
                      </Link>
                      <Link
                        to="/products/desktops"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Desktops
                      </Link>
                      <Link
                        to="/products/digital-signage"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Digital signage
                      </Link>
                      <Link
                        to="/products/digital-boards"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Digital Boards
                      </Link>
                      <Link
                        to="/products/led-walls"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        LED walls
                      </Link>
                      <Link
                        to="/products/public-addressing-system"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Public addressing system
                      </Link>
                      <Link
                        to="/products/commerical-tvs"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Commercial TV's
                      </Link>
                      <Link
                        to="/products/commerical-printers"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Commerical Printers
                      </Link>
                      <Link
                        to="/products/projectors"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Projectors
                      </Link>
                      <Link
                        to="/products/firewalls"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Firewalls
                      </Link>
                      <Link
                        to="/products/ptz-cameras"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Ptz cameras
                      </Link>
                      <Link
                        to="/products/thermal-printers"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Thermal printers
                      </Link>
                      <Link
                        to="/products/oniline-ups"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Oniline ups
                      </Link>
                    </div>
                  )}
                </div>
                <div
                  onMouseEnter={() => setActiveSub("b2c")}
                  onMouseLeave={() => setActiveSub(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubmenuClick("b2c");
                  }}
                  className="relative group"
                >
                  <div
                    className={`px-4 py-2 cursor-pointer flex justify-between ${
                      activeSub === "b2c" ? "text-blue-600" : "text-white"
                    } hover:bg-blue-50 hover:text-blue-600`}
                  >
                    B2C <FaChevronRight />
                  </div>
                  {activeSub === "b2c" && (
                    <div className="fixed top-20 left-[18rem] w-32 h-screen bg-[#0f172a] border  border-slate-700 rounded shadow-md z-[1000]">
                      <Link
                        to="/products/laptops"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Laptops
                      </Link>
                      <Link
                        to="/products/desktops"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Desktops
                      </Link>
                      <Link
                        to="/products/gaming-laptops"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Gaming Laptops
                      </Link>
                      <Link
                        to="/products/printers"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Printers
                      </Link>
                      <Link
                        to="/products/custompc"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Custom PC
                      </Link>
                      <Link
                        to="/products/antivirus"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Antivirus
                      </Link>
                      <Link
                        to="/products/gaming-monitor"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Gaming Monitor
                      </Link>
                      <Link
                        to="/products/rams"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Rams
                      </Link>
                      <Link
                        to="/products/ssd"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        SSD
                      </Link>
                      <Link
                        to="/products/pendrives"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Pendrives
                      </Link>
                      <Link
                        to="/products/external-hardisk"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        External Hardisks
                      </Link>
                      <Link
                        to="/products/i/o-devices"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        I/O devices
                      </Link>
                      <Link
                        to="/products/ups"
                        className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600"
                      >
                        Ups
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <Link
            to="/services"
            className="flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition-colors justify-center group-hover:justify-start"
          >
            <FaCogs className="text-lg  hover:text-blue-600" />
            <span className="text-sm font-bold group-hover:flex hidden">
              Services
            </span>
          </Link>
          <Link
            to="/expert-assistance"
            className="flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors justify-center group-hover:justify-start"
          >
            <FaHandsHelping className="text-lg  hover:text-blue-600" />
            <span className="text-sm font-bold group-hover:flex hidden">
              Expert Assistance
            </span>
          </Link>
          <Link
            to="/developers"
            className="flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition-colors justify-center group-hover:justify-start"
          >
            <FaUsers className="text-lg hover:text-blue-600" />
            <span className="text-sm font-bold group-hover:flex hidden">
              Our Team
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
