import { useState  } from "react"; //useState hook
import { Link, NavLink } from "react-router-dom";//Link and NavLink
import Popup from "./Popup";
import "./Navbar.css";//The styles
import { useLocation } from "react-router-dom";
export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const activeLinkId = location.pathname.split("/").pop();
    const [showPopup,setShowPopup]=useState(false);
 // function to show or hide the popup
 function togglePopup(){
  setShowPopup(!showPopup);
}
  return (
    <>

    <nav>
      <Link to="/user" className="title">
        <span>Sci</span>Search
      </Link>
      <div className="menu" onClick={() => {setMenuOpen(!menuOpen)}}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen && "open"}>
        <li>
          <NavLink to="/user" className={activeLinkId ==="User" || activeLinkId ==="user" ? 'activation': ''}>
            Acceuil
          </NavLink>
        </li>
        <li>
          <NavLink to="Favorits" className={activeLinkId ==="Favorits" ? 'activation': ''}>Favoris</NavLink>
        </li>
        <li>
          <NavLink onClick={togglePopup}>Mon Compte</NavLink>
        </li>
      </ul>
    </nav>
     {showPopup && <Popup hidePopup={togglePopup} img={require("./images/compteImage.png")} name="Remache Islam" email="li_remache@esi.dz" />}
     {showPopup && <div className="blurBackground" />}
     </>

  );
};
