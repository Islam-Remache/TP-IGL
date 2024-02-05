import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLocation } from "react-router-dom"

export const Edit = (props) => {

    const { state } = useLocation();
    const user= state;
    // const [data, setData] = useState([]);
    const navigate = useNavigate();
    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:8000/modifierModerateur/${id}/`).then(res => {
    //     setName(res.data.name)
    //     setEmail(res.data.email)    
    //     }).catch(err => console.log(err));
    // },[])
    function handleSubmit (event) {
        event.preventDefault();
        axios.put("http://localhost:3030/users/"+user.user.id, {newFullname:user.fullname,newEmail:user.user.username}).then((res => {
        console.log(res)    
        alert("Le modérateur a été mis à jour avec succès!");
            navigate('/admin/Moderateur')
        }))
    }
    return (
        <div className="create-container">
          <form className="box" onSubmit={handleSubmit} >
            <input
              disabled    
              type="text"
              name="id"
              value={`ID: ${user.user.id}`}
              className="form-control"
            ></input>
            <input
              required    
              type="text"
              name="name"
              className="form-control"
              value={user.fullname}
              onChange={e => setName(e.target.value)}
            />
            <input
              required
              type="email"
              name="email"
              className="form-control"
              value={user.user.username}
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <button className="btn btn-info">Mettre à jour</button>
          </form>
        </div>
      );
}


