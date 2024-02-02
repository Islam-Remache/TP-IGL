import { useState  } from "react"; //useState hook
import { Link, NavLink } from "react-router-dom";//Link and NavLink
import "./Navbar.css";//The styles
export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <Link to="/" className="title">
        <span>Sci</span>Search
      </Link>
      <div className="menu" onClick={() => {setMenuOpen(!menuOpen)}}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen && "open"}>
        <li>
          <NavLink to="/Home">
            Acceuil
          </NavLink>
        </li>
        <li>
          <NavLink to="/Favorits">Favoris</NavLink>
        </li>
        <li>
          <NavLink to="/Compte">Mon Compte</NavLink>
        </li>
      </ul>
    </nav>
  );
};
