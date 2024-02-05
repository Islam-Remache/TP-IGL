import { IoIosAddCircleOutline } from "react-icons/io";
import "./Uploaded.css";
import React, { useEffect } from "react";
import axios from "./api/axios";
import Uploaded from "./Uploaded.json"; //favoris json file which contain all the favoris articles of the current user
import { useState } from "react";
export const UploadedArticles = (props) => {
  const [Uploaded ,setUploaded]=useState([]);
  useEffect(()=>{
    console.log('jj')
    axios.get("http://localhost:8000/ArticlesManager/getNonValid/").then((res) => {
      setUploaded(res.data);
      console.log(res.data)
    });
  },[])
  return (
    <div id="all">
      <div className="head">
        <label id="ua">Uploaded Articles :</label>
        {/* <button>
          <IoIosAddCircleOutline id="ad" />
          <input type="file"></input>
        </button> */}
        <label for="file-input" class="file-input-label">
          <div class="file-picker-button">
            <IoIosAddCircleOutline id="ad" class="fas fa-upload" />
          </div>
        </label>
        <input type="file" id="file-input" class="file-input" />
      </div>
      <div className="Uploaded">
        {Uploaded['Articles Found']?.map((record) => {
          record = record['_source'];
          return (
            <div className="card-container">
              <img alt="article-img" src={require("./file.png")} />
              <div className="content">
                <h3>{record.Titre}</h3>
                <p>{record.Auteurs[0]['NomComplet']}</p>
              </div>
              <div className="info">
                <span title={record.MotsCle[0]}>{record.MotsCle[1]}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
