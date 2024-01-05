import image from "./images/articleCover.PNG"; //import the image articleCover
import { useState } from "react"; //import the useState hook
import "./correction.css"; //import the css file
import { FiDelete } from "react-icons/fi"; //import the delete icon
import { IoMdAddCircleOutline } from "react-icons/io";
import { Link } from "react-router-dom";

export const Correction = () => {
  //the title of the article
  const [title, setTitle] = useState("Online Accounting softwaring");
  //the subtitle of the article
  const [subTitle, setSubTitle] = useState("Finding The Right Match");
  //the content of the article
  const [integratedText, setIntegratedText] = useState("");
  //the resume of the article
  const [resume, setResume] = useState("");
  //all the keyWords extracted from the article
  const [list, setList] = useState([
    { name: "nature", id: 0 },
    { name: "tree", id: 1 },
    { name: "river", id: 2 },
    { name: "mountain", id: 3 },
    { name: "sea", id: 4 },
    { name: "sky", id: 5 },
  ]);

  //all the references of the article
  const [list2, setList2] = useState([
    {
      name: "Caron, J., & Théry, C. (2005). Prévenir et soigner les maladies du cœur. Odile Jacob.",
      id: 0,
    },
    {
      name: "Caron, J., & Théry, C. (2005). Prévenir et soigner les maladies du cœur. Odile Jacob.",
      id: 1,
    },
    {
      name: "Caron, J., & Théry, C. (2005). Prévenir et soigner les maladies du cœur. Odile Jacob.",
      id: 2,
    },
    {
      name: "Caron, J., & Théry, C. (2005). Prévenir et soigner les maladies du cœur. Odile Jacob.",
      id: 3,
    },
    {
      name: "Caron, J., & Théry, C. (2005). Prévenir et soigner les maladies du cœur. Odile Jacob.",
      id: 4,
    },
  ]);
  //state that represents the reference that we want to add
  const [reference, setReference] = useState("");
  //state that represents the keyword that we want to add
  const [keyWord, setKeyWord] = useState("");
  //create the html elements related to each key word

  const [list3, setList3] = useState([
    { author: "boughouas mohamed", institution: "esi algiers", id: 0 },
    { author: "boughouas mohamed", institution: "esi algiers", id: 1 },
    { author: "boughouas mohamed", institution: "esi algiers", id: 2 },
    { author: "boughouas mohamed", institution: "esi algiers", id: 3 },
  ]);
  const [author, setAuthor] = useState("");
  const [institution, setInstitution] = useState("");

  const createAuthors = () => {
    return list3.map((element, index) => (
      <div className="authAnDinst">
        <article id="auth">{element.author}</article>

        <input
          id="inst"
          onChange={handle4}
          placeholder="the institutuion of the author"
        ></input>
        <FiDelete //delete icon
          className="Deleteicon"
          onClick={() => remove3(element.id)}
        />
      </div>
    ));
  };
  const add_it3 = () => {
    author !== "" &&
      list3.length < 5 &&
      //don't add empty reference and not more than five references
      setList3([
        ...list3,
        {
          author: author,
          institution: institution,
          id: list3.length === 0 ? 1 : list3[list3.length - 1].id + 1, //id's should be 0,1,2....etc
        },
      ]);
  };

  const handle3 = (event) => {
    setAuthor(event.target.value);
  };
  const handle4 = (event) => {
    setInstitution(event.target.value);
  };
  const remove3 = (id) => {
    setList3(list3.filter((ele) => ele.id !== id));
  };

  const createKeyWords = (i, j) => {
    return list.map(
      (element, index) =>
        index + 1 >= i &&
        index + 1 <= j && (
          <article key={index}>
            <p>{element.name}</p>
            <FiDelete //delete icon
              className="iconDelete"
              onClick={() => remove(element.id)}
            />
          </article>
        )
    );
  };
  //create the html elements related to each reference
  const createReferences = () => {
    return list2.map((element, index) => (
      <article key={index} className="ref">
        <p>{element.name}</p>
        <FiDelete //delete icon
          className="iconDelete"
          onClick={() => remove2(element.id)}
        />
      </article>
    ));
  };
  //add the content of the input to the list of keyWords
  const add_it = () => {
    keyWord !== "" &&
      list.length < 6 && //don't add empty keyWord and don't add more than six keyWords
      setList([
        ...list,
        {
          name: keyWord,
          id: list.length === 0 ? 1 : list[list.length - 1].id + 1, //id's should be 0,1,2....etc
        },
      ]);
  };
  console.log(list3);
  //add the content of the input to the list of references
  const add_it2 = () => {
    reference !== "" &&
      list2.length < 5 &&
      //don't add empty reference and not more than five references
      setList2([
        ...list2,
        {
          name: reference,
          id: list2.length === 0 ? 1 : list2[list2.length - 1].id + 1, //id's should be 0,1,2....etc
        },
      ]);
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
  const remove = (id) => {
    setList(list.filter((ele) => ele.id !== id));
  };
  //remove a reference from list using its id
  const remove2 = (id) => {
    setList2(list2.filter((ele) => ele.id !== id));
  };

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
                }}
              ></input>
              <label>Sous Titre :</label>
              <input
                type="text"
                value={subTitle}
                onChange={(event) => {
                  setSubTitle(event.target.value);
                }}
              ></input>
              <label>Mots Clés :</label>
            </section>
            <div className="allKeyWords">
              <section className="kWords">
                {list.length === 0 && (
                  <h7>there are no keyWords for this article</h7>
                )}
                {createKeyWords(1, 3)}
                {/*first section contains only three keyWords */}
              </section>
              <section className="kWords">
                {list.length > 0 &&
                  list.length <= 3 &&
                  window.innerWidth > 500 && (
                    <h7>you can add more keyWords here</h7>
                  )}
                {list.length === 0 && window.innerWidth > 500 && (
                  <h7>you can create new ones in this section</h7>
                )}
                {createKeyWords(4, 6)}
                {/*second section contains only three keyWords */}
              </section>
            </div>
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
          <div className="authorsAndInstitutions">{createAuthors()}</div>
          <section className="changing3">
            <input
              type="text"
              onChange={handle3}
              className="authHolder"
              placeholder="new author to add"
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
          <button id="st">Valider</button>
          <button id="nd">Supprimer</button>
        </div>
      </form>
    </div>
  );
};
