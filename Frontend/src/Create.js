import React, { useState } from "react";
import axios from "axios";
import "./Create.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export const Create = () => {
  const navigat = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  function handleAjouter(event) {
    event.preventDefault();
    if (!name) {
      toast.error("Veuillez entrer le nom du modérateur à ajouter !", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (!email) {
      toast.error("Veuillez entrer le mot de pass du modérateur à ajouter !", {
        autoClose: 3000,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else {
      axios
        .post("http://127.0.0.1:8000/ajouterModerateur/", {
          fullname: name,
          email: email,
          password: pass,
        })
        .then((res) => {
          if (res.status == "201") {
            toast.success("Modérateur ajoutée avec succès !", {
              fullname: name,
              email: email,
              password: pass,
            });
            navigat(-1);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <div className="create-container">
      <form className="box">
        <input
          required
          type="text"
          name="name"
          placeholder="Nom"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          required
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <input
          required
          type="password"
          name="mot de pass"
          placeholder="Mot de pass"
          className="form-control"
          onChange={(e) => setPass(e.target.value)}
        ></input>
        <br />
        <button onClick={handleAjouter} className="btn btn-info">
          Ajouter
        </button>
      </form>
    </div>
  );
};
