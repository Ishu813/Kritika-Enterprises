import { useState, useEffect } from "react";

// Breakpoints (customize as needed)
const MOBILE_MAX = 767; // <768px is mobile
const TABLET_MAX = 1023; // 768px-1023px is tablet

export default function useDeviceType() {
  const [device, setDevice] = useState(getDeviceType());

  function getDeviceType() {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    if (width <= MOBILE_MAX) return "mobile";
    if (width <= TABLET_MAX) return "tablet";
    return "desktop";
  }

  useEffect(() => {
    const handleResize = () => {
      setDevice(getDeviceType());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return device; // 'mobile', 'tablet', or 'desktop'
}
