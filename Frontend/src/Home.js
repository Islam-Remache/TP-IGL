import { Link } from "react-router-dom";
import './Home.css'
export const Home = () => {
  return (
    <div>
        <Link to={"/"} className="logo">
          <span>Sci</span>Search
        </Link>
      <div className="landing">
          <div className="text">
            <h2>
              Rechercher Votre
              <br />
              <span>Articles</span>
            </h2>
            <p>Explorez le monde de la connaissance scientifique en un clic!</p>
            <div className="links">
              <Link className="link" to={"/LoginSignup"}>
                inscrire
              </Link>
              <Link className="link" to={"/LoginSignup"}>
                connexion
              </Link>
            </div>
          </div>
      </div>
    </div>
  );
};
