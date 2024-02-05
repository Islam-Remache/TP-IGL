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
import axios from "./api/axios";
 //Heart icon
export const Favorits = (props) => {
  const [favorites ,setFavorites]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:8000/getFavories/").then((resp)=>{
    const queryParams = resp.data.listIdsArticles?.map(id => `ids[]=${encodeURIComponent(id)}`).join('&')
    axios.get(`http://localhost:8000/ArticlesManager/getFavories/?${queryParams}`).then((res) => {
      setFavorites(res.data);
      const jsonString = JSON.stringify({data:[...res.data['Articles Found']],from:'F'});
      localStorage.setItem('myObjectKey', jsonString);
      console.log(res.data)
    });
  })
  },[])
  return (
    <>
    <h2 className="titleFavoris">Favoris</h2>
    <div className="favorits">
      {favorites["Articles Found"]?.map((record) => {
           let id = record['_id']
           record = record['_source'];
     
        return (
          <div className="card-container">
            <div className="heart">
              <FaHeart className="icon"/>
              </div>
            <img className="articleImg" alt="article-img" src='/static/media/article1.9ed4d960a714e289ba45.webp' />
            <div className="content">
              <h3>{record.Titre}</h3>
              <p>{record.Auteurs[0]["NomComplet"]}</p>
            </div>
            <div className="info">
              <div title={record.MotsCle[0]}>{record.MotsCle[1]}</div>
              <Link className="more" to={`Details/${id}`}>
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
