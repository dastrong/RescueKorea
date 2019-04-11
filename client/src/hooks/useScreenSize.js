import { useState, useEffect } from "react";

export default function useScreenSize() {
  const [isMobile, setSize] = useState(window.innerWidth < 767);

  useEffect(() => {
    const handleResize = () => setSize(window.innerWidth < 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobile]);

  return isMobile;
}
