import "./Favorits.css"; //Facorits styles
import { Link } from "react-router-dom";
import React from "react";
import favorits from "./favorits.json"; //favorits json file which contain all the favoris articles of the current user
import { FaHeart } from "react-icons/fa";
 //Heart icon
export const Favorits = (props) => {
  return (
    <div className="favorits">
      {favorits.favorits.map((record) => {
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
              <Link className="more" to="/Statistics">
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
