import { useState, useEffect } from "react"; //useState jook and useEffect hook
import { useLocation } from "react-router-dom"; //useLocation to get the current location
export const MaybeShowNavbar = ({ children }) => {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(false);
  useEffect(() => {
    if (
      location.pathname === "/loginSignup" ||
      location.pathname === "/home" ||
      location.pathname === "/" ||
      location.pathname === "/moderateur" ||
      location.pathname === "/statistique" ||
      location.pathname === "/articles" ||
      location.pathname === "/correction" 
      
    ) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location]);
  return <div>{showNavBar && children}</div>;
};
