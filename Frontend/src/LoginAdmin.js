import { Link } from "react-router-dom";
import "./LoginSignup.css";
import axios from "./api/axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
export const LoginAdmin = () => {
  const [email, setEmail] = useState("");
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
            navigate("/admin");
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
  return (
    <div>
      {/* <!-- Start Login --> */}
      <div className="hero">
        <div className="overlay"></div>
        <div className="form-box">
         <h2 className="titileModerateur">Login Admin</h2>
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
