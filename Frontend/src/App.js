import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Recherche } from "./Recherche";
import { Correction } from "./Correction";
import { Statistics } from "./Statistics";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/recherche" element={<Recherche />} />
          <Route path="/correction" element={<Correction />} />
          <Route path="/statistics" element={<Statistics />} />
          <Route path="*" element={<h1>page not found</h1>} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
