import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Recherche } from "./Recherche";
import { Correction } from "./Correction";
import { Statistics } from "./Statistics";
import { Home } from "./Home";
import { LoginSignup } from "./LoginSignup";
import { Favorits } from "./Favorits";
import { useMediaQuery } from "react-responsive";
import { Moderateur } from "./Moderateur";
import { ModerateurMobile } from "./ModerateurMobile";
import { Create } from "./Create";
import { Edit } from "./Edit";
import Dashboard from "./Dashboard";
import User from "./User";
import All2 from "./All2";
// import { All } from "./All";
import articles from "./Uploaded.json";
import { UploadedArticles } from "./UploadedArticles";
import { Details } from "./Details";
import Popup from "./Popup";

function App() {
  //useMediaQuery is a hook to know the width of the screen
  var isPhone = useMediaQuery({ query: "(max-width:800px)" });
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/admin" element={<Dashboard />}>
            <Route index element={<Statistics />} />
            <Route
              path="Moderateur"
              element={isPhone ? <ModerateurMobile /> : <Moderateur />}
            />
            <Route path="Edit/:id" element={<Edit />} />
            <Route path="Articles" element={<UploadedArticles />} />
            <Route path="Create" element={<Create />} />
            {/* <Route path="/Edit" element={<Edit />} /> */}
          </Route>

          <Route path="/Modirateur">
            <Route index element={<All2 />} />

            <Route
              path="/Modirateur/:id"
              element={<Correction articles={articles.articles} />}
            />
            {/* <Route
              path="/Modirateur/:id"
              element={<Correction articles={articles} />}
            /> */}
          </Route>

          <Route path="/user" element={<User />}>
            <Route index element={<Recherche />} />
            <Route path="Details/:id" element={<Details />} />
            <Route path="Favorits">
              <Route index element={<Favorits />} />
              <Route path="Details/:id" element={<Details />} />
            </Route>
            <Route path="Popup" element={<Popup />} />
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/LoginSignup" element={<LoginSignup />} />

          <Route path="*" element={<h1>page not found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
