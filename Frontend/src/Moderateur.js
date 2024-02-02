import React from "react";
import User from "./User";
import users from "./users.json";
import "./style.css";//The styles

export const Moderateur = () => {
    return(
        <div id="moderateurPage">
            <div id="head">
                <h1>Modérateurs</h1>
                <button id="addButton">+</button>
            </div>
            <table id="accounts">
                <thead>
                    <tr >
                        <th className="headTable"></th>
                        <td className="headTable">Nom du moderateur</td>
                        <td className="headTable">Adresse Email</td>
                        <td className="headTable">Modifier</td>
                        <td className="headTable">Supprimer</td>
                    </tr>
                </thead>
                <tbody>
                {/* to map the data from a file(i put an example which is users.json file) and display in the table, you can replace the users array with your array of users collected from the database  */}
                {users.users.map(user=>(<User key={user.id} name={user.name} img={user.img} email={user.email} />))}
                </tbody>
            </table>
        </div>
    )
}