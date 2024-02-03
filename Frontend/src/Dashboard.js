import { Outlet } from "react-router-dom"
import { Navbar1 } from "./Navbar1"
import { useMediaQuery } from "react-responsive";
import { Navbar1Mobile } from "./NavBar1Mobile";

const Dashboard = ()=>{
    var isPhone=useMediaQuery({query:"(max-width:800px)"});
    return (
        <div>
            {isPhone ? <Navbar1Mobile /> : <Navbar1 />}
            <div>
                <Outlet />
            </div>
        </div>
    )
}
export default Dashboard