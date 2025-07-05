import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaHome, FaBox, FaCogs, FaChevronRight, FaHandsHelping, FaUsers } from "react-icons/fa";
import { HiOutlineLightBulb } from "react-icons/hi";

// Sidebar navigation for the application
const Leftbar = () => {
  // State to track which main menu (Products, B2C, B2B) is currently expanded
  const [activeMainMenu, setActiveMainMenu] = useState(null); // e.g. "products", "b2c", "b2b"
  // State to track which submenu (category under B2B) is currently expanded
  const [activeB2BCategory, setActiveB2BCategory] = useState(null); // e.g. "education", "industry", "medical", "hospitality"

  const location = useLocation();

  // Collapse all menus when the route changes
  useEffect(() => {
    setActiveMainMenu(null);
    setActiveB2BCategory(null);
  }, [location.pathname]);

  // Handles expanding/collapsing a main menu section
  const handleMainMenuClick = (menuKey) => {
    if (activeMainMenu === menuKey) {
      setActiveMainMenu(null);
      setActiveB2BCategory(null);
    } else {
      setActiveMainMenu(menuKey);
    }
  };

  // Handles expanding/collapsing a B2B category submenu
  const handleB2BCategoryClick = (categoryKey) => {
    if (activeB2BCategory === categoryKey) {
      setActiveB2BCategory(null);
    } else {
      setActiveB2BCategory(categoryKey);
    }
  };

  return (
    // Sidebar container (hidden on small screens, visible on sm and up)
    <div className="bg-[#0f172a]">
      <div
        className="fixed top-20 left-0 h-[calc(100vh-4rem)] border-r-2 border-slate-700 z-10 bg-[#0f172a] transition-all duration-500 group hover:w-40 w-12 sm:block"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="space-y-4">
          {/* Home link */}
          <Link to='/' className="flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md cursor-pointer justify-center group-hover:justify-start">
            <FaHome className="text-lg hover:text-blue-600" />
            <span className="text-sm font-bold group-hover:flex hidden">Home</span>
          </Link>

          {/* Products Dropdown */}
          <div
            onMouseEnter={() => setActiveMainMenu("products")}
            onMouseLeave={() => setActiveMainMenu(null)}
            onClick={() => handleMainMenuClick("products")}
            className="relative flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md cursor-pointer justify-center group-hover:justify-start"
          >
            <FaBox className="text-lg hover:text-blue-600" />
            <span className="text-sm font-bold items-center justify-between w-full group-hover:flex hidden">
              Products <FaChevronRight className="ml-auto" />
            </span>
            {/* Products submenu */}
            {activeMainMenu === "products" && (
              <div className="fixed top-20 left-40 w-32 h-screen bg-[#0f172a] border border-slate-700 rounded shadow-md z-[999] transition-all duration-400">
                <Link to="/products/laptops" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Laptops</Link>
                <Link to="/products/desktops" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Desktops</Link>
                <Link to="/products/gaming-components" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Gaming Components</Link>
                <Link to="/products/printers" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Printers</Link>
                <Link to="/products/monitors" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Monitors</Link>
                <Link to="/products/digital-boards" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Digital Boards</Link>
                <Link to="/products/servers" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Servers</Link>
                <Link to="/products/softwares" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Softwares</Link>
                <Link to="/products/storages" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Storages</Link>
                <Link to="/products/input-devices" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Input Devices</Link>
              </div>
            )}
          </div>

          {/* B2C Dropdown */}
          <div
            onMouseEnter={() => setActiveMainMenu("services")}
            onMouseLeave={() => { setActiveMainMenu(null); setActiveB2BCategory(null); }}
            onClick={() => handleMainMenuClick("services")}
            className="relative flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md cursor-pointer justify-center group-hover:justify-start"
          >
            <FaCogs className="text-lg hover:text-blue-600" />
            <span className="text-sm font-bold items-center justify-between w-full group-hover:flex hidden">
              B2C <FaChevronRight className="ml-auto" />
            </span>
            {/* B2C submenu */}
            {activeMainMenu === "services" && (
              <div className="fixed top-20 left-40 w-32 h-screen bg-[#0f172a] border border-slate-700 rounded shadow-md z-[999] transition-all duration-400">
                <Link to="/products/laptops" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Laptops</Link>
                <Link to="/products/desktops" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Desktops</Link>
                <Link to="/products/gaming-laptops" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Gaming Laptops</Link>
                <Link to="/products/printers" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Printers</Link>
                <Link to="/products/custompc" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Custom PC</Link>
                <Link to="/products/antivirus" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Antivirus</Link>
                <Link to="/products/gaming-monitor" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Gaming Monitor</Link>
                <Link to="/products/rams" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">RAMs</Link>
                <Link to="/products/ssd" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">SSD</Link>
                <Link to="/products/pendrives" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Pen Drives</Link>
                <Link to="/products/external-hardisk" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">External Hard Disks</Link>
                <Link to="/products/i/o-devices" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">I/O Devices</Link>
                <Link to="/products/ups" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">UPS</Link>
              </div>
            )}
          </div>

          {/* B2B Dropdown with category submenus */}
          <div
            onMouseEnter={() => setActiveMainMenu("solutions")}
            onMouseLeave={() => { setActiveMainMenu(null); setActiveB2BCategory(null); }}
            onClick={() => handleMainMenuClick("solutions")}
            className="relative flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md cursor-pointer justify-center group-hover:justify-start"
          >
            <HiOutlineLightBulb className="text-2xl hover:text-blue-600" />
            <span className="text-sm font-bold items-center justify-between w-full group-hover:flex hidden">
              B2B <FaChevronRight className="ml-auto" />
            </span>
            {/* B2B categories submenu */}
            {activeMainMenu === "solutions" && (
              <div className="fixed top-20 left-40 w-32 h-screen bg-[#0f172a] border border-slate-700 rounded shadow-md z-[999] flex flex-col transition-all duration-400">
                {/* Education category */}
                <div
                  onMouseEnter={() => setActiveB2BCategory("schools")}
                  onMouseLeave={() => setActiveB2BCategory(null)}
                  onClick={(e) => { e.stopPropagation(); handleB2BCategoryClick("schools"); }}
                  className="relative"
                >
                  <div className={`px-4 py-2 cursor-pointer flex justify-between ${activeB2BCategory === 'schools' ? 'text-blue-600' : 'text-white'} hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md`}>
                    Education <FaChevronRight />
                  </div>
                  {/* Education submenu */}
                  {activeB2BCategory === "schools" && (
                    <div className="fixed top-20 left-[18rem] w-40 h-screen bg-[#0f172a] border border-slate-700 rounded shadow-md z-[1000] transition-all duration-300">
                      <Link to="/products/laptops" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Laptops</Link>
                      <Link to="/products/desktops" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Desktops</Link>
                      <Link to="/products/digital-boards" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Digital Boards</Link>
                      <Link to="/products/projectors" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Projectors</Link>
                      <Link to="/products/printers" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Printers</Link>
                    </div>
                  )}
                </div>
                {/* Industry Supplies category */}
                <div
                  onMouseEnter={() => setActiveB2BCategory("industry")}
                  onMouseLeave={() => setActiveB2BCategory(null)}
                  onClick={(e) => { e.stopPropagation(); handleB2BCategoryClick("industry"); }}
                  className="relative"
                >
                  <div className={`px-4 py-2 cursor-pointer flex justify-between ${activeB2BCategory === 'industry' ? 'text-blue-600' : 'text-white'} hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md`}>
                    Industry Supplies <FaChevronRight />
                  </div>
                  {/* Industry Supplies submenu */}
                  {activeB2BCategory === "industry" && (
                    <div className="fixed top-20 left-[18rem] w-40 h-screen bg-[#0f172a] border border-slate-700 rounded shadow-md z-[1000] transition-all duration-300">
                      <Link to="/products/servers" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Servers</Link>
                      <Link to="/products/firewalls" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Firewalls</Link>
                      <Link to="/products/online-ups" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Online UPS</Link>
                      <Link to="/products/storages" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Storages</Link>
                    </div>
                  )}
                </div>
                {/* Medical category */}
                <div
                  onMouseEnter={() => setActiveB2BCategory("medical")}
                  onMouseLeave={() => setActiveB2BCategory(null)}
                  onClick={(e) => { e.stopPropagation(); handleB2BCategoryClick("medical"); }}
                  className="relative"
                >
                  <div className={`px-4 py-2 cursor-pointer flex justify-between ${activeB2BCategory === 'medical' ? 'text-blue-600' : 'text-white'} hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md`}>
                    Medical <FaChevronRight />
                  </div>
                  {/* Medical submenu */}
                  {activeB2BCategory === "medical" && (
                    <div className="fixed top-20 left-[18rem] w-40 h-screen bg-[#0f172a] border border-slate-700 rounded shadow-md z-[1000] transition-all duration-300">
                      <Link to="/products/laptops" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Laptops</Link>
                      <Link to="/products/desktops" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Desktops</Link>
                      <Link to="/products/printers" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Printers</Link>
                      <Link to="/products/monitors" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Monitors</Link>
                    </div>
                  )}
                </div>
                {/* Hospitality category */}
                <div
                  onMouseEnter={() => setActiveB2BCategory("hospitality")}
                  onMouseLeave={() => setActiveB2BCategory(null)}
                  onClick={(e) => { e.stopPropagation(); handleB2BCategoryClick("hospitality"); }}
                  className="relative"
                >
                  <div className={`px-4 py-2 cursor-pointer flex justify-between ${activeB2BCategory === 'hospitality' ? 'text-blue-600' : 'text-white'} hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md`}>
                    Hospitality <FaChevronRight />
                  </div>
                  {/* Hospitality submenu */}
                  {activeB2BCategory === "hospitality" && (
                    <div className="fixed top-20 left-[18rem] w-40 h-screen bg-[#0f172a] border border-slate-700 rounded shadow-md z-[1000] transition-all duration-300">
                      <Link to="/products/digital-signage" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Digital Signage</Link>
                      <Link to="/products/led-walls" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">LED Walls</Link>
                      <Link to="/products/public-addressing-system" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Public Addressing System</Link>
                      <Link to="/products/commercial-tvs" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Commercial TVs</Link>
                      <Link to="/products/commercial-printers" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Commercial Printers</Link>
                      <Link to="/products/ptz-cameras" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">PTZ Cameras</Link>
                      <Link to="/products/thermal-printers" className="block px-4 py-2 text-sm text-white hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200">Thermal Printers</Link>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Expert Assistance link */}
          <Link
            to="/advisory"
            className="flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md cursor-pointer justify-center group-hover:justify-start"
          >
            <FaHandsHelping className="text-lg hover:text-blue-600" />
            <span className="text-sm font-bold group-hover:flex hidden">Expert Assistance</span>
          </Link>

          {/* Our Team link */}
          <Link
            to="/developers"
            className="flex items-center gap-6 px-1 group-hover:px-3 py-4 text-white hover:bg-blue-50 hover:text-blue-600 transition-colors rounded-md cursor-pointer justify-center group-hover:justify-start"
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
