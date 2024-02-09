import React from "react";
import { FaArrowRight, FaArrowDown, FaArrowLeft } from "react-icons/fa"; //import arrows icons
import { CiSearch } from "react-icons/ci"; //import search icon
import { Link } from "react-router-dom"; //to use Link tag instead of a tag
import "./Uploaded.css"
import "./Recherche.css"; //import css file
import image from "./images/image1.PNG"; //import the image used in the last div
import { useEffect, useState } from "react"; //import useState hook
// import { CiBoxList } from "react-icons/ci";
import { FaList } from "react-icons/fa";
// import { CiBoxList } from "react-icons/ci";
import axios from "./api/axios";
import { FaRegHeart } from "react-icons/fa";

export const Recherche = () => {

  useEffect(() => {
    async function fetchData() {
      // Retrieve myObjectKey from local storage
      const storedJsonString = localStorage.getItem('myObjectKey');
  
      // Check if myObjectKey exists in local storage
      if (storedJsonString) {
        const storedObject = JSON.parse(storedJsonString);
  
        // Fetch data and update myObjectKey
        const resp = await axios.get(`http://127.0.0.1:8000/getFavories/${localStorage.getItem('responseId')}/`);
  
        localStorage.setItem("myObjectKey", JSON.stringify({
          data: storedObject.data || [],  // Ensure data is an array
          from: "R",
          fav: resp.data.listIdsArticles
        }));
      }
    }
  
    fetchData();
  }, []);
  
  
  ///
  const [result2, setResult2] = useState(localStorage.getItem('myObjectKey')?[... JSON.parse(localStorage.getItem('myObjectKey'))['data']]:[]);
  const [result, setResult] = useState(localStorage.getItem('myObjectKey')?[... JSON.parse(localStorage.getItem('myObjectKey'))['data']]:[])
  const [searchInput, setSearchInput] = useState("");
  const [Fav,setFav]=useState([])
  const handleChange = (event) => {
    setSearchInput(event.target.value);
  };

  let getResult = async () => {
    const res = await axios.get(
      "http://localhost:8000/ArticlesManager/search/",
      { params: { text: searchInput } }
    );
    setResult(res.data["Articles Found"]);
    setResult2(res.data["Articles Found"]);
    const resp = await axios.get(`http://127.0.0.1:8000/getFavories/${localStorage.getItem('responseId')}/`)
    setFav(resp.data.listIdsArticles)
    console.log(resp.data.listIdsArticles)

    const jsonString = JSON.stringify({
      data: [...res.data["Articles Found"]],
      from: "R",
      fav : resp.data.listIdsArticles
    });
    localStorage.setItem("myObjectKey", jsonString);
  };
  const addToFavorites = (id) => {
    axios
      .post(
        "http://localhost:8000/accountManagerApp/ajouterAuFavories/<str:idArticle>/<int:idCurrentUser>/",
        { id }
      )
      .then((response) => {
        console.log("Article added to favorites successfully");
        // Optionally, you can perform additional actions after successful addition
      })
      .catch((error) => {
        console.error("Error adding article to favorites:", error);
        // Handle error scenarios here
      });
  };

  //

  let keys = [];
  for (let i = 0; i < result2.length; i++) {
    // keys = keys.concat(result[i].MotsCle);
    result2[i]["_source"].MotsCle.map((ele) => {
      if (keys.includes(ele) === false) {
        keys.push(ele);
      }
    });
  }
  let dates = [];
  for (let i = 0; i < result2.length; i++) {
    if (dates.includes(result2[i]["_source"].DatePublication) === false)
      dates.push(result2[i]["_source"].DatePublication);
  }
  let auths = [];
  for (let i = 0; i < result2.length; i++) {
    let auteurs = result2[i]["_source"].Auteurs;
    for (let j = 0; j < auteurs.length; j++) {
      if (auths.includes(auteurs[j].NomComplet) === false)
        auths.push(auteurs[j].NomComplet);
    }
  }
  let institutes = [];

  // Iterate through the list of authors
  for (let i = 0; i < result.length; i++) {
    let auteurs = result2[i]["_source"].Auteurs;
    for (let j = 0; j < auteurs.length; j++) {
      let institutions = auteurs[j].Institutions;
      for (let k = 0; k < institutions.length; k++) {
        let institutionName = institutions[k].Nom;
        if (!institutes.includes(institutionName)) {
          institutes.push(institutionName);
        }
      }
    }
  }

  const [whichIcon, setWhichIcon] = useState(0);
  useEffect(() => {
    window.innerWidth < 700 ? setWhichIcon(1) : setWhichIcon(0);
  }, [whichIcon]);

  window.onresize = () => {
    window.innerWidth < 700 ? setWhichIcon(1) : setWhichIcon(0);
  };
  const [display, setDisplay] = useState(false);
  const [show2, setShow2] = useState(false);

  const [arrows, setArrows] = useState([
    { show: false, id: 0, title: "Mots Clés", name: "MotsCle" },
    { show: false, id: 1, title: "Auteurs", name: "Auteurs" },
    { show: false, id: 2, title: "Institutions", name: "Institutions" },
    {
      show: false,
      id: 3,
      title: "Dates de publication",
      name: "DatePublication",
    },
  ]);

  const change = (i) => {
    setArrows(
      arrows.map((ele) =>
        ele.id === i
          ? { show: true, id: i, title: ele.title }
          : { show: false, id: ele.id, title: ele.title }
      )
    );
  };

  const createArticles = () => {
    return arrows.map((arrow, index) =>
      index === 0 ? (
        <select
          name="MotsCle"
          key={index}
          onClick={()=>{change(0)}}
         
          onChange={(event) => {
            
            if (result.lenght !== 0) {
              setResult(
                result2.filter((ele) =>
                  ele["_source"].MotsCle.includes(event.target.value)
                )
              );
            };
          }}
         
        >
          <option selected disabled>
            Mot Clés
          </option>
          {keys.map((ele) => (
            <option>{arrow.show ? ele : 'Mots Clés' }</option>
          ))}
        </select>
      ) : index === 1 ? (
        <select
          name="Auteurs"
          key={index}
          onClick={()=>{change(1)}}
          onChange={(event) => {
       
            if (result.lenght !== 0) {
              setResult(
                result2.filter((ele) =>
                  ele["_source"].Auteurs.some(
                    (author) => author.NomComplet === event.target.value
                  )
                )
              );
            };
          }}
        >
          <option selected disabled>
            Auteurs
          </option>
          {auths.map((ele) => (
            <option>{arrow.show ? ele : "Auteurs"}</option>
          ))}
        </select>
      ) : index === 2 ? (
        <select
          name="Institutions"
          key={index}
          onClick={()=>{change(2)}}
          onChange={(event) => {
         
            if (result.lenght !== 0) {
              setResult(
                result2.filter((article) =>
                  article["_source"].Auteurs.some((author) =>
                    author.Institutions.some(
                      (institution) => institution.Nom === event.target.value
                    )
                  )
                )
              );
            };
          }}
        >
          <option selected disableds>
            Institutions
          </option>
          {institutes.map((ele) => (
            <option>{arrow.show ? ele : 'Institutions'}</option>
          ))}
        </select>
      ) : (
        index === 3 && (
          <select
            name="DatePublication"
            key={index}
            onClick={()=>{change(3)}}
            onChange={(event) => {
          
              if (result.lenght !== 0) {
                setResult(
                  result2.filter((ele) =>
                    ele["_source"].DatePublication.includes(event.target.value)
                  )
                );
              };
            }}
          >
            <option selected disabled>
              Date De publication
            </option>
            {dates.map((ele) => (
              <option>{arrow.show ? ele : 'Date De publication'}</option>
            ))}
          </select>
        )
      )
    );
  }; //end of the function

  const display_result = () => {
    return (
      <div className="Uploaded">
        {result &&
          result.map((record) => {
            let id = record["_id"];
            record = record["_source"];
            return (  <div className="card-container">
            <img alt="article-img" src={require("./file.png")} />
            <div className="content">
              <h3>{record.Titre}</h3>
              {record.Auteurs.map((ele)=><p>{ele['NomComplet']}</p>)}
              
            </div>
            <div className="infoC">
               <span title={record.MotsCle.join(" , ")}>{record.MotsCle.join(" , ")}</span>
            
            </div>
            <Link className="more" to={`Details/${id}`}>
                    Savoir Plus
                  </Link>
          </div>
            );
          })}
      </div>
    );
  };
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
          onChange={handleChange}
          type="search"
          className="search_input"
          placeholder="tapez votre article ici, Example : Software engineering guide"
        ></input>
        <Link href="#">
          {whichIcon === 0 ? (
            <CiSearch className="search_icon" onClick={getResult} />
          ) : (
            <FaList className="options" />
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

      <div className="categories">{/*les critéres de recherche */}</div>
      {result.length !== 0 && createArticles()}
      {result.length !== 0 && display_result()}

      {result.length === 0 && (
        <div className="secondary-div">
          <img src={image} alt="not found" />
          <p>Le moyen rapide pour la recherche des articles scientifiques</p>
        </div>
      )}
    </div>
  );
};
