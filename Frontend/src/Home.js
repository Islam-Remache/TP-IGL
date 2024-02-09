import { Link } from "react-router-dom";
import './Home.css'
export const Home = () => {
  return (
    <div>
      {/* <!-- Start Header --> */}
      <header className="header">
        <Link to={"/"} className="logo">
          <span>Sci</span>Search
        </Link>
      </header>
      {/* <!-- End Header --> */}
      {/* <!-- Start Landing --> */}
      <div className="landing">
        <div className="container">
          <div className="overlay"></div>
          <div className="text">
            <h2>
              Rechercher Votre
              <br />
              <span>Articles</span>
            </h2>
            <p>Explorez le monde de la connaissance scientifique en un clic!</p>
            <div className="links">
              <Link className="link" to={"/LoginSignupUser"}>
                inscrire
              </Link>
              <Link className="link" to={"/LoginSignupUser"}>
                connexion
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Main Js File  */}
      <script src="js/script.js"></script>
    </div>
  );
};
