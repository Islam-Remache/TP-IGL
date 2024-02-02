import { Link } from "react-router-dom";

export const LoginSignup = () => {
  function register() {
    let x = document.getElementById("login");
    let y = document.getElementById("signup");
    let z = document.getElementById("btn");
    let c = document.getElementById("connexion");
    let i = document.getElementById("inscrire");
    x.style.left = "-400px";
    y.style.left = "50px";
    z.style.left = "184px";
    z.style.right = "8px";
    c.style.opacity = ".6";
    i.style.opacity = "1";
  }
  function login() {
    let x = document.getElementById("login");
    let y = document.getElementById("signup");
    let z = document.getElementById("btn");
    let c = document.getElementById("connexion");
    let i = document.getElementById("inscrire");
    x.style.left = "50px";
    y.style.left = "400px";
    z.style.left = "8px";
    i.style.opacity = ".6";
    c.style.opacity = "1";
  }
  return (
    <div>
      {/* <!-- Start Login --> */}
      <div className="hero">
        <div className="overlay"></div>
        <div className="form-box">
          <div className="button-box">
            <div id="btn"></div>
            <button
              id="connexion"
              type="button"
              className="toggle-btn"
              onClick={login}
            >
              Connexion
            </button>
            <button
              id="inscrire"
              type="button"
              className="toggle-btn"
              onClick={register}
            >
              Inscrire
            </button>
          </div>
          <form id="signup" action="" className="input-group">
            <input
              type="text"
              className="input-field"
              placeholder="Nom Complet"
              required
            />
            <input
              type="email"
              className="input-field"
              placeholder="Adresse E-mail"
              required
            />
            <input
              type="password"
              className="input-field"
              placeholder="Mot de passe"
              required
            />
            <input
              type="submit"
              className="submit-btn"
              value="Créer un compte"
            />
          </form>
          <form id="login" action="" className="input-group">
            <input
              type="email"
              className="input-field"
              placeholder="Adresse E-mail"
              required
            />
            <input
              type="password"
              className="input-field"
              placeholder="Mot de passe"
              required
            />
            <input type="submit" className="submit-btn" value="Connecter" />
          </form>
          <div className="or">Ou</div>
          <p className="alternate">Connecter avec</p>
          <Link to={"/"} lang="link" href="Login.js">
            <img
              className="gmail"
              src={require("./images/google.PNG")}
              alt=""
            />
          </Link>
        </div>
      </div>
      {/* <!-- End Login --> */}
    </div>
  );
};
