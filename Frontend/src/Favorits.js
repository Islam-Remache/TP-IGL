import "./Favorits.css"; //Facorits styles
import { Link, useSearchParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
// import db from "./db.json"; //favorits json file which contain all the favoris articles of the current user
import { FaHeart } from "react-icons/fa";
import axios from "axios";
 //Heart icon
export const Favorits = (props) => {
  const [favorites ,setFavorites]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3030/favorits").then((res) => {
      setFavorites(res.data);
    });
  },[])
  return (
    <div className="favorits">
      {favorites.map((record) => {
        return (
          <div className="card-container">
            <div className="heart">
              <FaHeart className="icon"/>
              </div>
            <img alt="article-img" src={require("./images/file.png")} />
            <div className="content">
              <h3>{record.title}</h3>
              <p>{record.author}</p>
            </div>
            <div className="info">
              <Link className="more" to={`details/${record.id}`}>
                Savoir Plus
              </Link>
              <span title={record.tags}>{record.tags}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
