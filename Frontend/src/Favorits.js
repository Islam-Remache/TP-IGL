import "./Favorits.css"; //Facorits styles
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./images/article1.webp"; 
import "./images/article3.webp"; 
import "./images/article4.webp"; 
import "./images/article7.jpg"; 
import "./images/article8.png"; 
import "./images/article9.webp"; 
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
    <>
    <h2 className="titleFavoris">Favoris</h2>
    <div className="favorits">
      {favorites.map((record) => {
        return (
          <div className="card-container">
            <div className="heart">
              <FaHeart className="icon"/>
              </div>
            <img className="articleImg" alt="article-img" src={record.src} />
            <div className="content">
              <h3>{record.title}</h3>
              <p>{record.author}</p>
            </div>
            <div className="info">
              <div title={record.tags}>{record.tags}</div>
              <Link className="more" to={`Details/${record.id}`}>
                Plus
              </Link>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
};
