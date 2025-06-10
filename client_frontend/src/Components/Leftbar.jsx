import { useState, useEffect, useRef } from "react";
import { FaHome, FaBox, FaCogs } from "react-icons/fa";
import { Link } from "react-router-dom";

const Leftbar = () => {
  const [productsOpen, setProductsOpen] = useState(false);
  const [b2cOpen, setB2cOpen] = useState(false);
  const [b2bOpen, setB2bOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutSide = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setProductsOpen(false);
        setB2cOpen(false);
        setB2bOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutSide);
    return () => document.removeEventListener("mousedown", handleClickOutSide);
  }, []);

  return (
    <div className="fixed inset-0 z-40">
      <div
        className="fixed top-[9%] left-0 w-52 h-screen border-r-2 p-4 z-50 bg-white"
        onClick={(e) => {
          e.stopPropagation(); // prevent bubbling to global click //chatgpt
          setProductsOpen(false);
          setB2cOpen(false);
          setB2bOpen(false);
        }}
      >
        <div className="space-y-4">
          <div className="flex items-center gap-6 px-3 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition-colors">
            <FaHome className="text-lg" />
            <span className="text-sm font-bold">Home</span>
          </div>

          <div
            className="relative flex items-center gap-6 px-3 py-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md cursor-pointer transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setProductsOpen(!productsOpen);
              setB2cOpen(false);
              setB2bOpen(false);
            }}
            ref={containerRef}
          >
            <FaBox className="text-lg" />
            <span className="text-sm font-bold">Products</span>

            {productsOpen && (
              <div className="fixed top-40 left-52 w-40 bg-white border border-gray-200 rounded shadow-md z-[999]">
                <div
                  className="px-4 py-2 text-gray-700 text-sm hover:bg-blue-50 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProductsOpen(true);
                    setB2cOpen(!b2cOpen);
                    setB2bOpen(false);
                  }}
                >
                  B2C
                </div>
                <div
                  className="px-4 py-2 text-gray-700 text-sm hover:bg-blue-50 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setProductsOpen(true);
                    setB2bOpen(!b2bOpen);
                    setB2cOpen(false);
                  }}
                >
                  B2B
                </div>

                {b2cOpen && (
                  <div className="absolute top-0 left-40 w-40 bg-white border border-gray-200 rounded shadow-md">
                    <Link
                      to="/products/B2C/laptops"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      Laptops
                    </Link>
                    <Link
                      to="/products/B2C/ram"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      RAM
                    </Link>
                    <Link
                      to="/products/B2C/sd"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      SD
                    </Link>
                  </div>
                )}

                {b2bOpen && (
                  <div
                    className="absolute top-0 left-40 w-40 bg-white
                    border border-gray-200 rounded shadow-md "
                  >
                    <Link
                      to="/products/B2B/medical"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      Medical
                    </Link>
                    <Link
                      to="/products/B2B/monitor"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      Monitor
                    </Link>
                    <Link
                      to="/products/B2B/eltc"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                    >
                      other
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <div
            className="flex items-center gap-6 px-3 py-4 text-gray-700 hover:bg-blue-50
           hover:text-blue-600 rounded-md cursor-pointer transition-colors"
          >
            <FaCogs className="text-lg" />
            <span className="text-sm font-bold">Services</span>
          </div>

          <div
            className="flex items-center gap-6 px-3 py-4 text-gray-700 hover:bg-blue-50
           hover:text-blue-600 rounded-md cursor-pointer transition-colors"
          >
            <FaCogs className="text-lg" />
            <span className="text-sm font-bold">Solutions</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leftbar;
