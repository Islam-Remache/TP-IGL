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

  const [pdfLink, setPdfLink] = useState('');

  const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setPdfLink(file.name);
    
  }
};

useEffect(()=>{
  if(pdfLink !== ''){
  axios.post("http://localhost:8000/ArticlesManager/save/",{"Url":`C:/Users/DELL/Desktop/Uploads/${pdfLink}`},{
            headers: {
              'Content-Type': 'application/json',
              // Add any other headers as needed
            },})
          }
},[pdfLink])
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
<input type="file" id="file-input" class="file-input" accept=".pdf" onChange={handleFileChange} />      </div>
      <div className="Uploaded">
        {Uploaded['Articles Found']?.map((record) => {
          record = record['_source'];
          return (
            <div className="card-container">
              <img alt="article-img" src={require("./file.png")} />
              <div className="content">
                <h3>{record.Titre}</h3>
                {record.Auteurs.map((ele)=><p>{ele['NomComplet']}</p>)}
                
              </div>
              <div className="infoC">
                 <span title={record.MotsCle.join(" , ")}>{record.MotsCle.join(" , ")}</span>
              
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
