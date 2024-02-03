import { IoIosAddCircleOutline } from "react-icons/io";
import "./Uploaded.css";
import React from "react";
import Uploaded from "./Uploaded.json"; //favoris json file which contain all the favoris articles of the current user
export const UploadedArticles = (props) => {
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
        {Uploaded.map((record) => {
          return (
            <div className="card-container">
              <img alt="article-img" src={require("./file.png")} />
              <div className="content">
                <h3>{record.title}</h3>
                <p>{record.author}</p>
              </div>
              <div className="info">
                <span title={record.tags}>{record.tags}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
