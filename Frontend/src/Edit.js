import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Edit = () => {
    const { id } = useParams();
    // const [data, setData] = useState([]);
    const [email,setEmail]=useState("")
    const [name,setName]=useState("")
    const navigate = useNavigate();
    useEffect(() => {
        axios.get("http://localhost:3030/users/"+id).then(res => {
        setName(res.data.name)
        setEmail(res.data.email)    
        }).catch(err => console.log(err));
    },[])
    function handleSubmit (event) {
        event.preventDefault();
        console.log(name)
        axios.put("http://localhost:3030/users/"+id, {id:id,name:name,email:email}).then((res => {
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
              value={`ID: ${id}`}
              className="form-control"
            ></input>
            <input
              required    
              type="text"
              name="name"

              className="form-control"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <input
              required
              type="email"
              name="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <button className="btn btn-info">Mettre à jour</button>
          </form>
        </div>
      );
}


