import React,{useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faChartSimple,faUsers,faNewspaper,faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {NavLink,useLocation} from "react-router-dom";
import Popup from "./Popup";
import "./style.css";//The styles

export const Navbar1 = () => {
    // this is a state to show or hide the popup 
    const [showPopup,setShowPopup]=useState(false);
    // to know the path of the active link
    const location = useLocation();
    const activeLinkId = location.pathname.split('/').pop();

    // function to show or hide the popup
    function togglePopup(){
        setShowPopup(!showPopup);
    }
    // style of each link depend on active link
    const style1={
        backgroundColor: "white",
        color: "#000080",
        borderRadius:"30px 0px 0px 30px",
    }
    const style2={
        backgroundColor: "#000080",
        color: "white",
        borderRadius:"0px 0px 30px 0px",
    }
    const style3={
        backgroundColor: "#000080",
        color: "white",
        borderRadius:"0px 0px 0px 0px",
    }
    const style4={
        backgroundColor: "#000080",
        color: "white",
        borderRadius:"0px 30px 0px 0px",
    }

    //  function change the style of links depend on the active link 
    function navLinkStyle(){
        switch(activeLinkId){
            case "admin":
                return style1;
            case "Moderateur":
                return style2;
            case "Articles":
                return style3;         
        }
    }
    function navLinkStyle2(){
        switch(activeLinkId){
            case "admin":
                return style4;
            case "Moderateur":
                return style1;
            case "Articles":
                return style2;         
        }
    }
    function navLinkStyle3(){
        switch(activeLinkId){
            case "admin":
                return style3;
            case "Moderateur":
                return style4;
            case "Articles":
                return style1;         
        }
    }
    //there is a better way but i did it in this way because of border radius 

    return(
        <>
            <section id="navBar">
                <div id="logo">
                    <FontAwesomeIcon icon={faMagnifyingGlass} id="searchIcon" />
                    <h1>Web App</h1>
                </div>
                
                <ul id="links">
                    <div id="linkContainer">
                        <NavLink style={navLinkStyle} to="/admin"><FontAwesomeIcon icon={faChartSimple} className="linkIcon" />Statistiques</NavLink>
                        <NavLink style={navLinkStyle2} to="Moderateur"><FontAwesomeIcon icon={faUsers} className="linkIcon" />Moderateurs</NavLink>
                        <NavLink style={navLinkStyle3} to="Articles"><FontAwesomeIcon icon={faNewspaper} className="linkIcon" />Uploaded Articles</NavLink>
                    </div>
                    
                </ul>
                <hr id="divider"></hr>
                <div id="account">
                    <img src={require("./images/compteImage.png")} alt="compte" onClick={togglePopup} />
                    <p>Islam Remache</p>
                </div>
            </section>
            {/* show or hide the pop up depend on the state of showPopup and the div for make the background blur */}
            {showPopup && <Popup hidePopup={togglePopup} img={require("./images/compteImage.png")} name="Remache Islam" email="li_remache@esi.dz" />}
            {showPopup && <div className="blurBackground" />}
        </>
        
    )
}