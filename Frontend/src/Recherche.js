import { FaArrowRight, FaArrowDown, FaArrowLeft } from "react-icons/fa"; //import arrows icons
import { CiSearch } from "react-icons/ci"; //import search icon
import { Link } from "react-router-dom"; //to use Link tag instead of a tag
import "./Recherche.css"; //import css file
import image from "./images/image1.PNG"; //import the image used in the last div
import { useEffect, useState } from "react"; //import useState hook
// import { CiBoxList } from "react-icons/ci";
import { FaList } from "react-icons/fa";
// import { CiBoxList } from "react-icons/ci";
import axios from "./api/axios";
import { FaHeart } from "react-icons/fa";

export const Recherche = () => {

  const [searchInput,setSearchInput]=useState('')
  console.log(searchInput)
  const [initialRender1, setInitialRender1] = useState(true);
  const [initialRender2, setInitialRender2] = useState(true);
  const [initialRender3, setInitialRender3] = useState(true);

  const [result,setResult]=useState([])
  const [newResult,setNewResult]=useState([])
  const [auteursNames,setauteursNames]=useState([])
  const [institutionsNames,setinstitutionsNames]=useState([])
  const [motsCle,setmotsCle]=useState([])
  const [categorie, setCategorie] = useState('');
  const [selectedOption1, setSelectedOption1] = useState('');
  const [selectedOption2, setSelectedOption2] = useState('');
  const [selectedOption3, setSelectedOption3] = useState('');


  const handleSearch=(event)=>{
    setSearchInput(event.target.value)
  };
  let getResult=async ()=>{
    const res = await axios.get("http://localhost:8000/ArticlesManager/search/",{params:{text: searchInput}})
    setResult(res.data)
    setNewResult(res.data["Articles Found"])
    const jsonString = JSON.stringify({data:[...res.data['Articles Found']],from:'R'});
    localStorage.setItem('myObjectKey', jsonString);
    console.log('jj',res.data,'bb',newResult)


  };

  useEffect(() => {
    if (newResult.length !== 0) {
      setauteursNames(result["Articles Found"].map(item => item['_source'].Auteurs.map(auteur => auteur["NomComplet"])).flat());
      setinstitutionsNames(result["Articles Found"].map(item => item['_source'].Auteurs.map(auteur => auteur["Institutions"].map(institution => institution["Nom"])).flat()).flat());
      setmotsCle(result["Articles Found"].map(item => item['_source']["MotsCle"]).flat());
    }
  }, [result]);
  




  //state that represents the categories of searches used
  const [arrows, setArrows] = useState([
    { show: true, id: 0, title: "Mots Clés", name: "MotsCle" },
    { show: false, id: 1, title: "Auteurs", name: "Auteurs" },
    { show: false, id: 2, title: "Institutions", name: "Institutions" },
    {
      show: false,
      id: 3,
      title: "Dates de publication",
      name: "DatePublication",
    },
  ]);

  ///
  /////

  

  let filterSearch = () => {
    
    if (
      result["Articles Found"].lenght !== 0 &&
      (categorie === "DatePublication" || categorie === "MotsCle")
    )
    
      setNewResult(result["Articles Found"].filter((ele) => ele['_source'][categorie].includes(selectedOption1)))
    else if (categorie === "Auteurs") {
      setNewResult(result["Articles Found"].filter((ele) =>
        ele['_source'].Auteurs.some((author) => author.NomComplet === selectedOption2)
      ))
    } else if (categorie === "Institutions") {
      setNewResult(result["Articles Found"].filter((article) =>
        article['_source'].Auteurs.some((author) =>
          author.Institutions.some(
            (institution) => institution.Nom === selectedOption3
          )
        )
      ))
    }
    console.log('mmm',categorie,selectedOption1,newResult,result);
    setCategorie('');


  };
  //filterSearch();
  // useEffect(() => {
  //   filterSearch();
  // }, [arrows]);

  const display_result = () => {
    console.log('kk',newResult)
    return (
      <div className="favorits">
        {newResult &&
          newResult.map((record) => {
            let id = record['_id']
            record = record['_source'];
            return (
              <div className="card-container">
                <div className="heart">
                  <FaHeart className="icon" />
                </div>
                <img alt="article-img" src={require("./images/file.png")} />
                <div className="content">
                  <h3>{record.Titre}</h3>
                  <p>{record.Auteurs.map(author => author["NomComplet"]).join(', ')}</p>
                </div>
                <div className="info">
                <span title={record.MotsCle.join(', ')}>{record.MotsCle.join(', ')}</span>

                  <Link className="more" to={`Details/${id}`}>
                    Savoir Plus
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    );
  };

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

   useEffect(() => {
    if (selectedOption1 === '') {
      setInitialRender1(false);
    } else {

      setCategorie('MotsCle');
    }
    
   }, [selectedOption1]);
   useEffect(() => {
    if (selectedOption2 === '') {
      setInitialRender2(false);
    } else {
      setCategorie('Auteurs')
    }
    
  }, [selectedOption2]);
  useEffect(() => {
    if (selectedOption3 === '') {
      setInitialRender3(false);
    } else {
      setCategorie('Institutions')
    }
    
  }, [selectedOption3]);

  useEffect(() => {
    if(categorie === ''){

    }else{
    filterSearch()
    }
  }, [categorie]);





  const handleChange1 = (event) => {
    const selectedValue = event.target.value;
    console.log('tar',event.target.value)
    setSelectedOption1(selectedValue);
    
  }
  const handleChange2 = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption2(selectedValue);

    
  }
  const handleChange3 = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption3(selectedValue);

    
  }

  const getChangeHandler = (index) => {
    switch (index) {
      case 0:
        return handleChange1;
      case 1:
        return handleChange2;
      case 2:
        return handleChange3;

    }
  };
  
  //function that creates the buttons to select the type of search used
  const createArticles = () => {
    
    
    return arrows.map((arrow, index) => (
      
      
      <select id="dropdown" 
      value={() => {switch (index) {
        case 0:
          return selectedOption1;
          break;
        case 1:
          return selectedOption2;
          break;
        case 2:
          return selectedOption3;
          break;}}}
      onChange={getChangeHandler(index)}
      style={{ width: '150px' }}>

        <option value="" disabled>{arrow.title}</option>
        {index === 0 && motsCle.map((option, index) => (
    <option key={index} value={option}>{option}</option>
  ))}
  {index === 1 && auteursNames.map((author, index) => (
    <option key={index} value={author}>{author}</option>
  ))}
  {index === 2 && institutionsNames.map((institution, index) => (
    <option key={index} value={institution}>{institution}</option>
  ))}
    {index === 3 && institutionsNames.map((institution, index) => (
    <option key={index} value={institution}>{institution}</option>
  ))}
      </select>
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
          onChange={handleSearch}
          type="search"
          className="search_input"
          placeholder="tapez votre article ici, Example : Software engineering guide"
        ></input>
        <Link href="#">
          {whichIcon === 0 ? (
            <CiSearch className="search_icon" onClick={getResult} />
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
            <li onClick={() => setDisplay(true)}><select id="dropdown" 
      value={selectedOption1}
      onChange={handleChange1}
      >

        <option value="" disabled>Mots Cle</option>
        {motsCle.map((option, index) => (
    <option key={index} value={option}>{option}</option>
  ))}
  
      </select></li>
      <li onClick={() => setDisplay(true)}><select id="dropdown" 
      value={selectedOption2}
      onChange={handleChange2}
      >

        <option value="" disabled>Auteurs</option>
        {auteursNames.map((option, index) => (
    <option key={index} value={option}>{option}</option>
  ))}
  
      </select></li>            
      
      <li onClick={() => setDisplay(true)}><select id="dropdown" 
      value={selectedOption3}
      onChange={handleChange3}
      >

        <option value="" disabled>Institutions</option>
        {institutionsNames.map((option, index) => (
    <option key={index} value={option}>{option}</option>
  ))}
  
      </select></li>           
      
      
      <li onClick={() => setDisplay(true)}><select id="dropdown" 
      value={selectedOption3}
      onChange={handleChange3}
      >

        <option value="" disabled>Date Publication</option>
        {institutionsNames.map((option, index) => (
    <option key={index} value={option}>{option}</option>
  ))}
  
      </select></li>          </ul>
        </div>
      )}

      <div className="categories">
        {/*les critéres de recherche */}
        {result.length !== 0 && createArticles()}
      </div>
      {display_result()}
      {result.lenght === 0 && (
        <div className="secondary-div">
          <img src={image} alt="not found" />
          <p>Le moyen rapide pour la recherche des articles scientifiques</p>
        </div>
      )}
    </div>
  );
};
