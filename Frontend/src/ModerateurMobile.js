import React from "react";
import users from "./users.json"
import UserMobile from "./UserMobile";
import "./style.css";//The styles

export const ModerateurMobile =() =>{
    return(
        <div id="moderateurPageMobile">
            <h1>Modérateurs</h1>
            {users.users.map(user=>(<UserMobile key={user.id} name={user.name} img={user.img} email={user.email} />))}
        </div>
    )
}