import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare,faTrash } from "@fortawesome/free-solid-svg-icons";

// a card which represents a user
export default function UserMobile(props){
    return(
        <div className="userMobile">
            <div className="infoUserMobile">
                <img src={require("./images/accountImage.png")} alt="compte" />
                <div>
                    <h1>{props.name}</h1>
                    <p>{props.email}</p>
                </div>      
            </div>     
            <div className="iconMobile">
                <button className="iconButton" id="edit"><FontAwesomeIcon icon={faPenToSquare} /></button>
                <button className="iconButton" id="delete"><FontAwesomeIcon icon={faTrash} /></button>
            </div>        
        </div>
    )
}