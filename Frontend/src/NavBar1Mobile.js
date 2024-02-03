import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartSimple,
  faUsers,
  faNewspaper,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import Popup from "./Popup";

export const Navbar1Mobile = () => {
  // to know the path of the active link
  const location = useLocation();
  const activeLinkId = location.pathname.split("/").pop();
  // this is a state to show or hide the popup
  const [showPopup, setShowPopup] = useState(false);
  // function to show or hide the popup
  function togglePopup() {
    setShowPopup(!showPopup);
  }
  // style of each link depend on active link
  const style1 = {
    borderRadius: "0px 0px 20px 0px",
  };
  const style2 = {
    borderRadius: "0px 0px 0px 20px",
  };
  //function to change the style of links depend on the active link
  function navLinkStyle( isActive) {
    return {
      backgroundColor: isActive ? "white" : "#000080",
      borderRadius: "20px 20px 0px 0px",
    };
  }

  return (
    <>
      <section id="navBarMobile">
        <div id="mobileTitle">
          <div id="logoMobile">
            <FontAwesomeIcon icon={faMagnifyingGlass} id="searchIconMobile" />
            <h1>Web App</h1>
          </div>
          <img
            alt=""
            src={require("./images/compteImage.png")}
            onClick={togglePopup}
          />
        </div>
        <hr id="dividerMobile"></hr>
        <ul id="linksMobile">
          <div id="linkContainerMobile">
            {/* i used conditional rendering to render the appropriate style depend on the active link  */}
            <div
              className="betweenLinks"
              style={activeLinkId === "admin" ? style1 : {}}
            ></div>
            <NavLink style={navLinkStyle(activeLinkId==="admin")} to="/admin">
              <FontAwesomeIcon
                icon={faChartSimple}
                className="linkIconMobile"
              />
            </NavLink>
            <div
              className="betweenLinks"
              style={
                activeLinkId === "admin"
                  ? style2
                  : activeLinkId === "Moderateur"
                  ? style1
                  : {}
              }
            ></div>
            <NavLink style={navLinkStyle(activeLinkId==="Moderateur")} to="Moderateur">
              <FontAwesomeIcon icon={faUsers} className="linkIconMobile" />
            </NavLink>
            <div
              className="betweenLinks"
              style={
                activeLinkId === "Moderateur"
                  ? style2
                  : activeLinkId === "Articles"
                  ? style1
                  : {}
              }
            ></div>
            <NavLink style={navLinkStyle(activeLinkId==="Articles")} to="Articles">
              <FontAwesomeIcon icon={faNewspaper} className="linkIconMobile" />
            </NavLink>
            <div
              className="betweenLinks"
              style={activeLinkId === "Articles" ? style2 : {}}
            ></div>
          </div>
        </ul>
      </section>
      {/* show or hide the pop up depend on the state of showPopup and the div for make the background blur */}
      {showPopup && (
        <Popup
          hidePopup={togglePopup}
          name="Remache Islam"
          img={require("./images/compteImage.png")}
          email="li_remache@esi.dz"
        />
      )}
      {showPopup && <div className="blurBackground" />}
    </>
  );
};
