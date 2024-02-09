// import { IoIosAddCircleOutline } from "react-icons/io";
import "./Uploaded.css";
// import React, { useEffect, Link } from "react";
// // import axios from "./api/axios";
import { Link } from "react-router-dom";
import { articles } from "./Uploaded.json";
// import { useState } from "react";

export default function All2() {
  return (
    <div id="all2">
      <div className="head">
        <label id="ua">non validated Articles:</label>
      </div>
      <div className="Uploaded">
        {Object.values(articles).map((record) => {
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
                <Link className="more" to={`/Modirateur/${record.id}`}>
                  Plus
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
