import React,{useEffect} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import "./style.css"
import { useNavigate } from "react-router-dom";

export default function Popup(props){
  const navigate = useNavigate()
  const handleLogOut = ()=>{
    localStorage.removeItem('myObjectKey')
    localStorage.removeItem('myObjectKey2')
    localStorage.removeItem('responseId')
    navigate('/')

  }
  useEffect(() => {
    //to hide the popup with espcape key
    const handleKeyDown = (event) => {
        if (event.key==="Escape") {
          console.log(event)
            props.hidePopup();
        }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
        document.removeEventListener('keydown', handleKeyDown);
    };
}, []);

    return(
      <div class="popup">
        <div className="infopopup">
            <p id="exit" onClick={()=>{props.hidePopup()}}>&times;</p>
            <img id="popupImage" src={props.img} alt="account" />
            <h1 id="popupTitle">{props.name}</h1>
            <p id="popupEmail">{props.email}</p>
        </div>
        <hr className="popupDivider"></hr>
        <button id="popupButton" onClick={handleLogOut}>Déconnecter <FontAwesomeIcon icon={faRightFromBracket}  /></button>
      </div>
    )
}