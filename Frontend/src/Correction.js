import image from "./images/articleCover.PNG"; //import the image articleCover
import { useState, useEffect } from "react"; //import the useState hook
import "./correction.css"; //import the css file
import { FiDelete } from "react-icons/fi"; //import the delete icon
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import axios from "./api/axios";
import { useParams } from "react-router-dom";

export const Correction = () => {
  const [title, setTitle] = useState("");
  //the content of the article
  const [integratedText, setIntegratedText] = useState("");
  //the resume of the article
  const [resume, setResume] = useState("");
  //all the keyWords extracted from the article
  const [list, setList] = useState([]);
  
  //all the references of the article
  const [list2, setList2] = useState( []);

  //state that represents the reference that we want to add
  const [reference, setReference] = useState("");
  //state that represents the keyword that we want to add
  const [keyWord, setKeyWord] = useState("");
  //create the html elements related to each key word

  const [keyWord2, setKeyWord2] = useState("");

  const [list3, setList3] = useState([]);
  console.log(list3)
  const [author, setAuthor] = useState("");
  const [institution, setInstitution] = useState("");
  const { id } = useParams();
  //const articleId = parseInt(id, 10);
  const [article,setArticle] = useState({})
  useEffect(() => {
  const storedJsonString = localStorage.getItem('myObjectKey');
  const storedObject1 = storedJsonString ? JSON.parse(storedJsonString) : null;
  setArticle(Object.values(storedObject1).find(
    (article) => article["_id"] === id
  ))
}, [id]);
 // console.log(articleId);
 // console.log(article.id);

  //the title of the article

  useEffect(()=>{
    if (article && article["_source"]){
    setTitle(article["_source"].Titre)
    setResume(article["_source"].Resume)
    setIntegratedText(article["_source"].TextIntegral)
    setList(article["_source"].MotsCle)
    setList2(article["_source"].References)
    setList3(article["_source"].Auteurs)
    }
  }
    ,[article])


 



  //  delele handle function
  // const handleDelete = async ()=>{
  //   let jj = "2bUZ1owB6FhGCMPlXy6E"
  //   const res = await axios.delete(`http://localhost:8000/ArticlesManager/Delete/${jj}/`)
  //   console.log(res)
  // }

  //   //  update handle function
    const handleUpdate = async ()=>{
    let doc = {
      
      Titre: title,
      Resume: resume,
      TextIntegral: integratedText,
      Url: article["_source"].Url,
      DatePublication: article["_source"].DatePublication,
      estValidee: 0,
      Auteurs: list3,
      MotsCle: list,
      References: list2,
    };

      let jj = "2rUe1owB6FhGCMPlTy41"
      console.log(doc)
      const res = await axios.post(`http://localhost:8000/ArticlesManager/Update/${article["_id"]}/`,doc,{
        headers: {
          'Content-Type': 'application/json',
          // Add any other headers as needed
        },})
      console.log(res)
    }

  const createAuthorsAndInstitutions = () => {
    return list3.map((element, index) => (
      <div className="authAnDinst">
        <input type="text" value={element.NomComplet} onChange={(event)=>{setList3((prevList) =>
  prevList.map((ele, ind) => (index === ind ? {NomComplet:event.target.value,Institutions:ele.Institutions} : ele))
);}}></input>
        <input type="text" value={element.Institutions[0].Nom} onChange={(event)=>{setList3((prevList) =>
  prevList.map((ele, ind) => (index === ind ? {NomComplet:ele.NomComplet,Institutions:[{Email:ele.Institutions[0].Email,Nom:event.target.value}]}  : ele))
);}}></input>
        <FiDelete //delete icon
          className="Deleteicon"
          onClick={() => remove3(element.NomComplet)}
        />
      </div>
    ));
  };
  const add_it3 = () => {
    author !== "" &&
      institution !== "" &&
      //don't add empty reference
      setList3([
        ...list3,
        {
          NomComplet: author,
          Institutions: [
            {
              Email: "",
              Nom: institution,
            },
          ],
        },
      ]);
  };

  const handle31 = (event) => {
    setAuthor(event.target.value);
  };
  const handle32 = (event) => {
    setInstitution(event.target.value);
  };
  // const handle4 = (event) => {
  //   setInstitution(event.target.value);
  // };
  const remove3 = (nom) => {
    setList3(list3.filter((ele) => ele.NomComplet !== nom));
  };

  const createKeyWords = (i) => {
    return list.map((element,index) => (
      <article>
        <input type="text" value={element} onChange={(event)=>{setList((prevList) =>
  prevList.map((ele, ind) => (index === ind ? event.target.value : ele))
);}}></input>
        <FiDelete //delete icon
          className="iconDelete1"
          onClick={() => remove(element)}
        />
      </article>
    ));
  };
  //create the html elements related to each reference
  const createReferences = () => {
    return list2.map((element, index) => (
      <article key={index} className="ref">
       <input type="text" value={element} onChange={(event)=>{setList2((prevList) =>
  prevList.map((ele, ind) => (index === ind ? event.target.value : ele))
);}}></input>
        <FiDelete //delete icon
          className="iconDelete2"
          onClick={() => remove2(element)}
        />
      </article>
    ));
  };
  //add the content of the input to the list of keyWords
  const add_it = () => {
    keyWord !== "" &&
      //don't add empty keyWord
      setList([...list, keyWord]);
  };

  //add the content of the input to the list of references
  const add_it2 = () => {
    reference !== "" &&
      //don't add empty reference
      setList2([...list2, reference]);
  };
  window.onload = () => {
    console.log(window.innerWidth);
  };
  //set the new keyword to be the value of input at each time we change its value
  const handle = (event) => {
    setKeyWord(event.target.value);
  };
  //set the new reference to be the value of input at each time we change its value
  const handle2 = (event) => {
    setReference(event.target.value);
  };
  //remove a keyWord from list using its id
  const remove = (element) => {
    setList(list.filter((ele) => ele!== element));
  };
  //remove a reference from list using its id
  const remove2 = (element) => {
    setList2(list2.filter((ele) => ele !== element));
  };
  useEffect(() => {
    const savedTitle = localStorage.getItem("title");

    if (savedTitle) {
      setTitle(savedTitle);
    }
  }, []);

  return (
    <div>
      <form>
        <div className="firstDiv">
          <img src={image} alt="not found" /> {/*article's cover*/}
          <div className="infos">
            <section className="title_subTitle">
              <label>Titre :</label>
              <input
                type="text"
                value={title}
                onChange={(event) => {
                  setTitle(event.target.value);
                  localStorage.setItem("title", title);
                }}
              ></input>

              <label>Mots Clés :</label>
            </section>

            <section className="kWords">
              {list.length === 0 && (
                <h7>there are no keyWords for this article</h7>
              )}
              {createKeyWords()}
            </section>

            <section className="changing">
              <input
                type="text"
                onChange={handle}
                className="kwHolder"
                placeholder="new keyword to add"
              ></input>
              <button
                className="add"
                onClick={(event) => {
                  event.preventDefault();
                  add_it();
                }}
              >
                <IoMdAddCircleOutline /> {/* add icone */}
              </button>
            </section>
          </div>
        </div>
        <div className="secondDiv">
          <label className="integ">texte intégrale :</label>
          <textarea
          value={integratedText}
            className="integ"
            onChange={(event) => {
              setIntegratedText(event.target.value);
            }} //change dynamically the content of the textarea using the state integratedText
          >
            {integratedText}
          </textarea>
          <button className="view">
            <Link href="#">Consulter text intégrale</Link>
          </button>
          <label>Résumé :</label>
          <textarea
          value={resume}
            id="resume"
            onChange={(event) => {
              setResume(event.target.value);
            }} //change dynamically the content of the textarea using the state resume
          >
            {resume}
          </textarea>
          <label>Réferences Bibliograhpiques :</label>
          <div className="RefsDiv">
            {list2.length === 0 && (
              <h7>
                there are no references for this article <br></br>you can add
                new ones here
              </h7>
            )}
            {createReferences()}
            {list2.length > 0 && list2.length < 5 && (
              <h7>you can add new reference here </h7>
            )}
          </div>

          <section className="changing2">
            <input
              type="text"
              onChange={handle2}
              className="refHolder"
              placeholder="new refernce to add"
            ></input>
            <button
              className="add2"
              onClick={(event) => {
                event.preventDefault();
                add_it2();
              }}
            >
              {" "}
              <IoMdAddCircleOutline /> {/* add icone */}
            </button>
          </section>
          <label>Authors And Institutions :</label>
          <div className="authorsAndInstitutions">
            {createAuthorsAndInstitutions()}
          </div>
          <section className="changing3">
            <input
              type="text"
              onChange={handle31}
              className="authHolder"
              placeholder="new author to add"
            ></input>
            <input
              type="text"
              onChange={handle32}
              className="instHolder"
              placeholder="new institution to add"
            ></input>
            <button
              className="add3"
              onClick={(event) => {
                event.preventDefault();
                add_it3();
              }}
            >
              <IoMdAddCircleOutline /> {/* add icone */}
            </button>
          </section>
        </div>

        <div className="decision">
          <button id="st" onClick={handleUpdate}>Valider</button>
          <button id="nd">Supprimer</button>
        </div>
      </form>
    </div>
  );
};
