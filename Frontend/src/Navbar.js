import { useState  } from "react"; //useState hook
import { Link, NavLink } from "react-router-dom";//Link and NavLink
import "./Navbar.css";//The styles
import { useLocation } from "react-router-dom";
export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const activeLinkId = location.pathname.split("/").pop();
  return (
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
          <NavLink to="/user" className={activeLinkId ==="user" ? 'activation': ''}>
            Acceuil
          </NavLink>
        </li>
        <li>
          <NavLink to="Favorits" className={activeLinkId ==="Favorits" ? 'activation': ''}>Favoris</NavLink>
        </li>
        <li>
          <NavLink className={activeLinkId ==="Compte" ? 'activation': ''} to="Compte">Mon Compte</NavLink>
        </li>
      </ul>
    </nav>
  );
};
