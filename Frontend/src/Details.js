import "./details.css";
import { FaLightbulb } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import image from "./images/articleCover.PNG"; //import the image articleCover
import { useParams } from 'react-router-dom';
import { useState } from "react";
export const Details = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    // Your logic here
    setIsClicked(!isClicked);
  };

  const [showPdf,setShowPdf]=useState(false)
  const storedJsonString = localStorage.getItem('myObjectKey');
  const storedObject1 = storedJsonString ? JSON.parse(storedJsonString) : null;
  const storedObject = [...storedObject1['data']]
  const from = storedObject1['from'] 

  const { id } = useParams();
  const doc = storedObject.find(obj => obj._id === id);

  let titre = "Online Accounting Softwaring";
  let sousTitre = "Finding The Right Match";
  let authors = [ 
    ["mohamed", "esi algiers"],
    ["raouf", "esi algiers"],
    ["akthem", "esi algiers"],
    ["grine", "esi algiers"],
  ];
  let authsDisplay = () => {
    return (
      <section id="auths">
        {doc['_source']['Auteurs']?.map(
          (ele, index) =>
            index < 6 && (
              <article>
                {ele['NomComplet']}
                <br></br>
                {ele['Institutions'][0]['Nom']}
              </article>
            )
        )}
      </section>
    );
  };
  let references = [
    `Caron, J., & Théry, C. (2005). Prévenir et soigner les maladies du cœur.
  Odile Jacob.`,
    `Caron, J., & Théry, C. (2005). Prévenir et soigner les maladies du cœur.
    Odile Jacob.`,
  ];
  const refsDisplay = () => {
    return doc['_source']['References'].map((ele) => <li>{ele}</li>);
  };
  let motClés = [
    "mot clé 1",
    "mot clé 2",
    "mot clé 3",
    "mot clé 4",
    "mot clé 1",
    "mot clé 2",
    "mot clé 3",
    "mot clé 4",
  ];
  /////
  let Résumé = `Building upon the success of best-sellers The Clean Coder and Clean Code, legendary software craftsman Robert C. "Uncle Bob" Martin shows how to bring greater professionalism and discipline to application architecture and design.
  As with his other books, Martin's Clean Architecture doesn't merely present multiple choices and options, and say "use your best judgment": it tells you what choices to make, and why those choices are critical to your success. Martin offers direct, no-nonsense answers to key architecture and design questions like:
  What are the best high level structures for different kinds of applications, including web, database, thick-client, console, and embedded apps?
  What are the core principles of software architecture?
  What is the role of the architect, and what is he/she really trying to achieve?
  What are the core principles of software design?
  How do designs and architectures go wrong, and what can you do about it?
  What are the disciplines and practices of professional architects and designers?
  Clean Architecture is essential reading for every software architect, systems analyst, system designer, and software manager — and for any programmer who aspires to these roles or is impacted by their work.`;
  /////
  let content = (i) => {
    return (
      <section className="motsClé">
        {doc['_source']['MotsCle']?.map((ele, index) => {
          return index < 6 && <article>{ele}</article>;
        })}
      </section>
    );
  };
  return (
    <div>
      <div className="firstDiv" id="tt">
        <div className="imgReaction">
          {" "}
          <img src={image} alt="not found" id="imgDetails" />{" "}
          {/*article's cover*/}
          <span className="articleIcons">
          {from === 'F' && isClicked &&  (
            
            <CiHeart className="icon" onClick={handleClick} />
      ) || from === 'F' && !isClicked &&  (
        <FaHeart className="heartDownload"  onClick={handleClick} 
        />
        
      ) || from ==='R' && isClicked &&  (
        <FaHeart className="icon" onClick={handleClick} />
     
        
      ) || from ==='R' && !isClicked &&  (
        <CiHeart className="heartDownload"  onClick={handleClick} 
        />
        
      )}
            <LuDownload className="heartDownload"  />
          </span>
        </div>

        <div className="informations">
          <header id="mainInfo">{`${doc['_source']['Titre']} - ${sousTitre}`}</header>
          {content()}
          <section id="end">
            <FaLightbulb id="bulb" />
            <p className="reminder">
              Ce livre est disponible en téléchargement gratuit en format PDF.
              Vous pouvez le lire en format texte ci-dessous.
            </p>
          </section>
        </div>
      </div>
      <div className="secondDiv">
        <label>Text intégral :</label>

        <div id="integ">
          <div id="pdfButtons">
            <button onClick={()=>{setShowPdf(false)}}>Format Text</button>
            <button onClick={()=>{setShowPdf(true)}}>Format PDF</button>
          </div>
         {!showPdf ? <p id="Txt">{doc['_source']['TextIntegral']}</p> :  <iframe className="pdf" src="https://drive.google.com/file/d/1eYjZWAqdQ3fBZRxOg8RmjgV2gUGsnfK0/preview" width="70%"  height="100%" allow="autoplay"></iframe>}
        </div>
        
        {/* <embed
          src="/Chapitre 4-flots_ROP_23.pdf"
          type="application/pdf"
          width="100%"
          height="600px"
        ></embed> */}
        <label>Résumé :</label>
        <p id="res">{doc['_source']['Resume']}</p>
        <label id="aut">Auteurs et leurs institutions :</label>
        {authsDisplay()}
        <label>Références bibliographiques</label>
        <ul id="refers">{refsDisplay()}</ul>
      </div>
    </div>
  );
};
