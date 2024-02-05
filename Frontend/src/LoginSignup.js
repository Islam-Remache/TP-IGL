import { Link } from "react-router-dom";
import './LoginSignup.css'
import axios from "./api/axios";
import React, { useState } from "react";
export const LoginSignup = () => {
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  const [pass,setPass]=useState("");

  // function handleLogin() {
  //   axios.post('https://8622-105-235-128-101.ngrok-free.app/logIn/', {
  //     firstName: 'Fred',
  //     lastName: 'Flintstone'
  //   })
  //   .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
 
  // }
  // function handleLogin() {
  //   // axios.get("https://8622-105-235-128-101.ngrok-free.app/nbUtilisateurs/")
  //   axios.get("https://4d0d-105-235-128-101.ngrok-free.app/nbUtilisateurs/").then(res => {
  //       console.log(res.data);  
  //       }).catch(err => console.log(err));
  // }
  // let handleLogin=async ()=>{
  //   const res = await axios.get("http://127.0.0.1:8000/nbUtilisateurs/")
  //   console.log('***************',res)
  // };
  let handleSignup=async ()=>{
    axios.post('http://127.0.0.1:8000/signUp/', {
      fullname: name,
      email: email,
      password: pass,
    })
    .then(function (response) {
      // if(response.status === "201") {}
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };
  function register() {
    let x = document.getElementById("login");
    let y = document.getElementById("signup");
    let z = document.getElementById("btn");
    let c = document.getElementById("connexion");
    let i = document.getElementById("inscrire");
    x.style.left = "-415px";
    y.style.left = "50px";
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
    x.style.left = "50px";
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
              onChange={e => setName(e.target.value)}
            />
            <input
              type="email"
              className="input-field"
              placeholder="Adresse E-mail"
              required
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Mot de passe"
              required
              onChange={e => setPass(e.target.value)}
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
              onChange={e => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="input-field"
              placeholder="Mot de passe"
              required
              onChange={e => setName(e.target.value)}
            />
            <input  type="submit" className="submit-btn" value="Connecter" />
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
