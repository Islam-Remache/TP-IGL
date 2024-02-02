import React, { useState } from "react";
import axios from "axios"
import "./Create.css";
import { useNavigate } from "react-router-dom";
export const Create = () => {
    const [inputData, setInpuData] = useState({name: '', email: ''});
    const navigat = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        axios.post("http://localhost:3030/users",inputData)
        .then(res => {
            alert("Moderateur ajoutée avec succès!");
            navigat('/admin/Moderateur')
        }).catch(err => console.log(err));
    }
  return (
    <div className="create-container">
      <form className="box" onSubmit={handleSubmit}>
        <input
        required    
          type="text"
          name="name"
          placeholder="Nom"
          className="form-control"
          onChange={e=>setInpuData({...inputData, name: e.target.value})}
        />
        <input
        required
          type="email"
          name="email"
          placeholder="Email"
          className="form-control"
          onChange={e=>setInpuData({...inputData, email: e.target.value})}
        ></input>
        <br />
        <button className="btn btn-info">Envoyer</button>
      </form>
    </div>
  );
};
