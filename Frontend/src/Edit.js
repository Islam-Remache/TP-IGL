import axios from "axios";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';


export const Edit = (props) => {
  const {id} = useParams()
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    // useEffect(() => {
    //     axios.get(`http://127.0.0.1:8000/modifierModerateur/${id}/`).then(res => {
    //     setName(res.data.name)
    //     setEmail(res.data.email)    
    //     }).catch(err => console.log(err));
    // },[])
    function handleSubmit (event) {
        event.preventDefault();
        if(!name) {
          toast.error("Veuillez entrer le nom du modérateur pour pouvoir continuer !", {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover:true,
          });
        } else if (!email) {
          toast.error("Veuillez entrer l'adresse e-mail pour pouvoir continuer !", {
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover:true,
          });
        } else{
        axios.put(`http://127.0.0.1:8000/modifierModerateur/${id}/`, {newFullname:name,newEmail:email}).then(res => {
          if (res.status == "200") {
            toast.success("Moderateur mis à jour avec succès !", {
              autoClose: 3000,
              closeOnClick: true, 
              pauseOnHover:true,
            });
            navigate(-1);
          }
        }).catch(error => console.log(error));
    }
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
              placeholder="Nouveau nom"
              onChange={e => setName(e.target.value)}
            />
            <input
              required
              type="email"
              name="email"
              className="form-control"
              placeholder="Nouveau email"
              onChange={e => setEmail(e.target.value)}
            />
            <br />
            <button className="btn btn-info" onClick={handleSubmit}>Mettre à jour</button>
          </form>
        </div>
      );
}


