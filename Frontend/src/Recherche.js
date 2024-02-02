import { FaArrowRight, FaArrowDown, FaArrowLeft } from "react-icons/fa"; //import arrows icons
import { CiSearch } from "react-icons/ci"; //import search icon
import { Link } from "react-router-dom"; //to use Link tag instead of a tag
import "./Recherche.css"; //import css file
import image from "./images/image1.PNG"; //import the image used in the last div
import { useEffect, useState } from "react"; //import useState hook
// import { CiBoxList } from "react-icons/ci";
import { FaList } from "react-icons/fa";
// import { CiBoxList } from "react-icons/ci";

export const Recherche = () => {
  //state that represents the categories of searches used
  const [arrows, setArrows] = useState([
    { show: true, id: 0, title: "Mots clés" },
    { show: false, id: 1, title: "Auteurs" },
    { show: false, id: 2, title: "Institutions" },
    { show: false, id: 3, title: "Dates de publication" },
  ]);
  // change the icon that indicates the type of search used
  const change = (i) => {
    setArrows(
      arrows.map((ele) =>
        ele.id === i
          ? { show: !ele.show, id: i, title: ele.title }
          : { show: false, id: ele.id, title: ele.title }
      )
    );
  };
  //function that creates the buttons to select the type of search used
  const createArticles = () => {
    return arrows.map((arrow, index) => (
      <article key={index} onClick={() => change(index)} className="art">
        <p>{arrow.title}</p>
        {arrow.show ? (
          <FaArrowDown className="icon" />
        ) : (
          <FaArrowRight className="icon" />
        )}
      </article>
    ));
  }; //end of the function
  const [whichIcon, setWhichIcon] = useState(0);
  useEffect(() => {
    window.innerWidth < 700 ? setWhichIcon(1) : setWhichIcon(0);
  }, [whichIcon]);

  window.onresize = () => {
    window.innerWidth < 700 ? setWhichIcon(1) : setWhichIcon(0);
  };
  const [display, setDisplay] = useState(false);
  const [show2, setShow2] = useState(false);

  return (
    <div id="bcd">
      <h1 className="hello">Chercher Votre Article</h1>
      <div className="intro">
        Effectuez une recherche à travers les informations de l'article. Vous
        pouvez rechercher avec le nom de l'article, son auteur, ses mots-clés,
        et son texte intégral.
      </div>
      {/* search bar */}
      <div className="searchBar">
        {show2 ? (
          <FaArrowDown className="mob" onClick={() => setShow2(!show2)} />
        ) : (
          <FaArrowLeft className="mob" onClick={() => setShow2(!show2)} />
        )}
        <input
          type="search"
          className="search_input"
          placeholder="tapez votre article ici, Example : Software engineering guide"
        ></input>
        <Link href="#">
          {whichIcon === 0 ? (
            <CiSearch className="search_icon" />
          ) : (
            <FaList className="options" onClick={() => setDisplay(true)} />
          )}
        </Link>
      </div>
      {display && (
        <div className="categories2">
          <ul
            onMouseLeave={() => {
              setDisplay(false);
            }}
          >
            <li onClick={() => setDisplay(false)}>Mots clés</li>
            <li onClick={() => setDisplay(false)}>Auteurs</li>
            <li onClick={() => setDisplay(false)}>Institutions</li>
            <li onClick={() => setDisplay(false)}>Dates de publication</li>
          </ul>
        </div>
      )}

      <div className="categories">
        {/*les critéres de recherche */}
        {createArticles()}
      </div>

      <div className="secondary-div">
        <img src={image} alt="not found" />
        <p>Le moyen rapide pour la recherche des articles scientifiques</p>
      </div>
    </div>
  );
};
