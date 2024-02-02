import { useState, useEffect } from "react"; //useState jook and useEffect hook
import { useLocation } from "react-router-dom"; //useLocation to get the current location
export const MaybeShowNavbar1 = ({ children }) => {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(false);
  useEffect(() => {
    if (
      location.pathname === "/loginSignup" ||
      location.pathname === "/home" ||
      location.pathname === "/favorits" ||
      location.pathname === "/recherche" ||
      location.pathname === "/correction" ||
      location.pathname === "/details"
    ) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location]);
  return <div>{showNavBar && children}</div>;
};
