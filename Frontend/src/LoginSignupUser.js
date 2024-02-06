import { Link } from "react-router-dom";
import "./LoginSignup.css";
import axios from "./api/axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export const LoginSignupUser = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  function handleLogin(event) {
    event.preventDefault();
    if (!email) {
      toast.error(
        "Veuillez entrer votre adresse e-mail pour vous connecter !",
        {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
    } else if (!pass) {
      toast.error("Veuillez entrer votre mot de pass pour vous connecter !", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      axios
        .post("http://127.0.0.1:8000/logIn/", {
          email: email,
          password: pass,
        })
        .then((res) => {
          localStorage.setItem("responseId", res.data.id);
          console.log(localStorage.getItem("responseId"));
          if (res.status == "200") {
            toast.success(
              "Félicitations ! Vous avez authentifié avec succès",
              {
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: true,
              }
            );
            navigate("/user");
          }
        })
        .catch(function (error) {
          toast.error("Compte innexistant ! Veuillez réessayer", {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: true,
          });
        });
    }
  }

  let handleSignup = async (event) => {
    event.preventDefault();
    if (!name) {
      toast.error("Veuillez entrer votre nom pour pouvoir vous inscrire !", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    }
    else
    if (!email) {
      toast.error(
        "Veuillez entrer votre email de pass pour pouvoir vous inscrire !",
        {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
    } else
    if (!pass) {
      toast.error(
        "Veuillez entrer votre mot de pass pour pouvoir vous inscrire !",
        {
          autoClose: 3000,
          closeOnClick: true,
          pauseOnHover: true,
        }
      );
    }  else {
      axios
        .post("http://127.0.0.1:8000/signUp/", {
          fullname: name,
          email: email,
          password: pass,
        })
        .then((res) => {
          localStorage.setItem("responseId", res.data.id);
          console.log(localStorage.getItem("responseId"));
          if (res.status == "201") {
            toast.success("Félicitations ! Votre inscription a été réussie !", {
              autoClose: 3000,
              closeOnClick: true,
              pauseOnHover: true,
            });
            navigate("/user");
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
  function register() {
    let x = document.getElementById("login");
    let y = document.getElementById("signup");
    let z = document.getElementById("btn");
    let c = document.getElementById("connexion");
    let i = document.getElementById("inscrire");
    x.style.left = "-415px";
    y.style.left = "63px";
    z.style.left = "203px";
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
    x.style.left = "63px";
    y.style.left = "415px";
    z.style.left = "11px";
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
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="input-field"
              placeholder="Adresse E-mail"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Mot de passe"
              required
              onChange={(e) => setPass(e.target.value)}
            />
            <input
              type="submit"
              className="submit-btn"
              value="Créer un compte"
              onClick={handleSignup}
            />
          </form>
          <form id="login" action="" className="input-group">
            <input
              type="email"
              className="input-field"
              placeholder="Adresse E-mail"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Mot de passe"
              required
              onChange={(e) => setPass(e.target.value)}
            />
            <input
              type="submit"
              className="submit-btn"
              value="Connecter"
              onClick={handleLogin}
            />
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
