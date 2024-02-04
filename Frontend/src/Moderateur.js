import React, { useEffect, useState } from "react"; //import userEffect hook To fetch data from "http://localhost:3030/users" every time the page reloads,
// Display the fetched data using the useState hook
import axios from "axios"; //import axios to fetch Data from moderateurs local server every time the page reloads,
import { Link, useNavigate } from "react-router-dom";
import "./style.css"; //Global styles
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faTrash } from "@fortawesome/free-solid-svg-icons";

export const Moderateur = () => {
  const [records, setRecords] = useState([]);
  const navigate = useNavigate();
  function handleSubmit(id) {
    const conf = window.confirm("voulez-vous supprimer?");
    if(conf) {
        axios.delete("http://localhost:3030/users/"+id).then(res => {
            alert("Le modérateur a été supprimé!");
            // navigate('/Moderateur')
            const filter = records.filter(user=>user.id!=id)
            setRecords(filter)
        }).catch(error => console.log(error));
    }
  }
  useEffect(() => {
    axios.get("http://localhost:3030/users").then((res) => {
      setRecords(res.data);
    });
  },[]);
  return (
    <div id="moderateurPage">
      <div id="head">
        <h1 className="moderateurTitle">Modérateurs</h1>
        <Link to={"/admin/Create"} id="addButton">
          +
        </Link>
      </div>
      <table id="accounts">
        <thead>
          <tr>
            <th className="headTable"></th>
            <td className="headTable">Nom du moderateur</td>
            <td className="headTable">Adresse Email</td>
            <td className="headTable"></td>
            <td className="headTable center">Modifier</td>
            <td className="headTable center">Supprimer</td>
          </tr>
        </thead>
        <tbody>
          {/* Display the data from "moderateurs" local server in a table by mapping the records */}
          {records.map(user => (
            <tr className="user">
              <td>
                <img
                  className="accountImg"
                  src={require("./images/accountImage.png")}
                  alt=""
                />
              </td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
              </td>
              <td className="center"><Link to={`/admin/Edit/${user.id}`} className="iconButton" id="edit"><FontAwesomeIcon icon={faPenToSquare} /></Link></td>
              <td className="center">
                <button onClick={e=> handleSubmit(user.id)} className="iconButton" id="delete">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

};
