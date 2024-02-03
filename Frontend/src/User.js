import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

const User= ()=>{
    return (
        <div>
            {/* // Navbar */}
            <Navbar />
            <div>
                <Outlet />
            </div>
        </div>
    )
}
export default User ; 