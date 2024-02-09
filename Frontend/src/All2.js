// import { IoIosAddCircleOutline } from "react-icons/io";
import "./Uploaded.css";
// import React, { useEffect, Link } from "react";
// // import axios from "./api/axios";
import { Link } from "react-router-dom";
//import { articles } from "./Uploaded.json";
// import { useState } from "react";
import axios from "./api/axios";
import { useState } from "react";

export default  function All2() {
  const [articles,setArticles] = useState([])
  axios.get('http://localhost:8000/ArticlesManager/getNonValid/').then((res)=>{
    setArticles(res.data["Articles Found"])
    const jsonString = JSON.stringify(res.data["Articles Found"]);
    localStorage.setItem("myObjectKey", jsonString);
  }
  

  )


  return (
    <div id="all2">
      <div className="head">
        <label id="ua">non validated Articles:</label>
      </div>
      <div className="Uploaded">
        {Object.values(articles).map((record) => {
              let id = record["_id"];
              record = record["_source"];
          return (
            <div className="card-container">
              <img alt="article-img" src={require("./file.png")} />
              <div classNamse="content">
                <h3>{record.Titre}</h3>
                {record.Auteurs.map((ele) => (
                  <p>{ele.NomComplet}</p>
                ))}
              </div>
              <div className="info">
                <Link className="more" to={`Edit/${id}`}>
                 Vérifier l'article
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
