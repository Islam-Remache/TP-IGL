import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPenToSquare,faTrash} from "@fortawesome/free-solid-svg-icons";

//this is a row in the table which represents a user 
export default function User(props){
    return (
        <tr className="user">
            <td><img className="accountImg" src={require("./images/accountImage.png")} alt=""/></td>        
            <td>{props.name}</td>
            <td>{props.email}</td>
            <td><button className="iconButton" id="delete"><FontAwesomeIcon icon={faTrash} /></button></td>
        </tr>
    )
}