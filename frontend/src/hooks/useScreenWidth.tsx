import { useEffect, useState } from "react";

const useScreenWidth = () => {
  const [screenWidth, setScreenWidth] = useState(0);

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    // Check if running in the browser
    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth); // Set initial screen width

      window.addEventListener("resize", handleResize);

      // Cleanup listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  return screenWidth;
};

export default useScreenWidth;
