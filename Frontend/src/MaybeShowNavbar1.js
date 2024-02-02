import { useState, useEffect } from "react"; //useState jook and useEffect hook
import { useLocation } from "react-router-dom"; //useLocation to get the current location
export const MaybeShowNavbar1 = ({ children }) => {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(false);
  useEffect(() => {
    if (
      location.pathname === "/LoginSignup" ||
      location.pathname === "/Home" ||
      location.pathname === "/Favorits" ||
      location.pathname === "/Recherche" ||
      location.pathname === "/Compte" ||
      location.pathname === "/Correction" ||
      location.pathname === "/Create" ||
      location.pathname === "/Edit" ||
      location.pathname.match(/^\/Update\/.*$/) 
    ) {
      setShowNavBar(false);
    } else {
      setShowNavBar(true);
    }
  }, [location]);
  return <div>{showNavBar && children}</div>;
};
