import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Recherche } from "./Recherche";
import { Correction } from "./Correction";
import { Statistics } from "./Statistics";
import { Home } from "./Home";
import { LoginSignup } from "./LoginSignup";
import { Navbar } from "./Navbar";
import { MaybeShowNavbar } from "./MaybeShowNavbar";
import { Favorits } from "./Favorits";
import { MaybeShowNavbar1 } from "./MaybeShowNavbar1";
import { Navbar1 } from "./Navbar1";
import { Navbar1Mobile } from "./NavBar1Mobile";
import {useMediaQuery} from "react-responsive";
import { Moderateur } from "./Moderateur";
import { ModerateurMobile } from "./ModerateurMobile";
import { Create } from "./Create";
import { Edit } from "./Edit";
import Dashboard from "./Dashboard";
import User from "./User";
import Account from "./Account";



function App() {
   //useMediaQuery is a hook to know the width of the screen
   var isPhone=useMediaQuery({query:"(max-width:800px)"});
  return (
    <div className="App">
      <Router>
        {/* <MaybeShowNavbar> 
          <Navbar />
        </MaybeShowNavbar> */}
        {/* <MaybeShowNavbar1 className={isPhone ? "homeContainerMobile" : "homeContainer" }>
          {isPhone ? <Navbar1Mobile /> : <Navbar1 />}
        </MaybeShowNavbar1> */}
        <Routes>
          <Route path="/Admin" element={<Dashboard />} >
            <Route index element={<Statistics />} />
            <Route path="Moderateur" element={ isPhone ?<ModerateurMobile /> : <Moderateur />} />
            <Route path="Edit/:id" element={<Edit />} />
            <Route path="Articles" element={<> </>} />
            <Route path="Create" element={<Create />} />
            {/* <Route path="/Edit" element={<Edit />} /> */}
          </Route>

          <Route path='/modirateur' >
            <Route index element={<Correction />} />
          </Route>

          <Route path="/User" element={<User />}>
            <Route index element={<Recherche />} />
            <Route path="Favorits" >
              <Route index element={<Favorits />} />
              <Route path=":id" element={<>hello world</>}/>
            </Route>
            <Route path="Compte" element={<Account />} />
          </Route>
          
          {/* <Route path="/Home" element={<Home />} /> */}
          <Route path="/" element={<Home />} />
          <Route path="/LoginSignup" element={<LoginSignup />} />

          
          
         
          {/* <Route path="*" element={<h1>page not found</h1>} /> */}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
