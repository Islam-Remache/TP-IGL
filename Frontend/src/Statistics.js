import "./statistics.css"; //import css file
import { IoDocumentTextOutline } from "react-icons/io5"; //import article icon
import { FaUsers } from "react-icons/fa"; //import users icon
import { useState, useEffect } from "react"; //import the hooks needed
import { FaUserCircle } from "react-icons/fa"; //import user icon

export const Statistics = () => {
  //the list of activities to display
  let activities = [
    {
      img: <FaUserCircle className="userIcon" />,
      moderateur: "boughouas mohamed",
      designation: "validation",
      article: "cloud computing",
    },
    {
      img: <FaUserCircle className="userIcon" />,
      moderateur: "boughouas mohamed",
      designation: "validation",
      article: "cloud computing",
    },
    {
      img: <FaUserCircle className="userIcon" />,
      moderateur: "boughouas mohamed",
      designation: "validation",
      article: "cloud computing",
    },
    {
      img: <FaUserCircle className="userIcon" />,
      moderateur: "boughouas mohamed",
      designation: "validation",
      article: "cloud computing",
    },
  ];
  //create a div for each activity and organise the infos
  const createActivities = () => {
    return activities.map((ele) => (
      <div className="activity">
        {ele.img}
        <h2>{ele.moderateur}</h2>
        <p className="verbe">
          a
          {ele.designation === "validation"
            ? " validé"
            : ele.designation === "suppresion"
            ? " supprimé"
            : " modifié"}{" "}
          l'article intitulé :
        </p>
        {<h2>{ele.article}</h2>}
      </div>
    ));
  };
  //state used to handle the positions of icons in stats divs
  const [before, setBefore] = useState(false);
  //depending on the width of page we change the state variable
  window.onresize = () => {
    window.innerWidth < 700 ? setBefore(true) : setBefore(false);
  };
  //using the state the icon will be whether before the statistic of after
  const art1 = before && <IoDocumentTextOutline className="icon" />;
  const art2 = !before && <IoDocumentTextOutline className="icon" />;
  const use1 = before && <FaUsers className="icon" />;
  const use2 = !before && <FaUsers className="icon" />;
  //control the initial position of the icon
  useEffect(() => {
    window.innerWidth < 700 ? setBefore(true) : setBefore(false);
  }, []);
  return (
    <div id="body3">
      {/* <header>Statistiques</header> */}
      <section className="stats">
        <div>
          {art1}
          <article className="value">
            25000 <br></br>Articles
          </article>
          {art2}
        </div>
        <div>
          {use1}
          <article className="value">
            1200<br></br> Utilisateurs
          </article>
          {use2}
        </div>
        <div>
          {use1}
          <article className="value">
            25 <br></br>Modérateurs
          </article>
          {use2}
        </div>
      </section>
      {/* <header>Acitivité récente des modérateurs</header> */}
      {createActivities()} {/* activities displayes */}
    </div>
  );
};
