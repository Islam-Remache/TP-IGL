import { useState } from "react"; //useState hook
import { Link, NavLink } from "react-router-dom"; //Link and NavLink
import "./Navbar.css"; //The styles
import Popup from "./Popup";
export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // this is a state to show or hide the popup
  const [showPopup, setShowPopup] = useState(false);

  function togglePopup() {
    setShowPopup(!showPopup);
  }

  return (
    <nav>
      <Link to="/" className="title">
        <span>Sci</span>Search
      </Link>
      <div
        className="menu"
        onClick={() => {
          setMenuOpen(!menuOpen);
        }}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen && "open"}>
        <li>
          <NavLink to="/recherche">Acceuil</NavLink>
        </li>
        <li>
          <NavLink to="/favorits">Favoris</NavLink>
        </li>
        <li>
          <NavLink onClick={togglePopup}>Mon Compte</NavLink>
        </li>
      </ul>
           {/* show or hide the pop up depend on the state of showPopup and the div for make the background blur */}
           {showPopup && <Popup hidePopup={togglePopup} img={require("./images/compteImage.png")} name="Remache Islam" email="li_remache@esi.dz" />}
            {showPopup && <div className="blurBackground" />}
    </nav>
    
  );
};
