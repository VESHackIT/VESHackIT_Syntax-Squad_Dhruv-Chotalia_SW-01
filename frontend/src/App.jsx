import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LetterPopup from "./pages/LetterPopup";
import SpellingBee from "./pages/Spelling_Bee";
import CardFlip from "./pages/CardFlip";
import Signup from "./pages/Signup";
import Signin from "./pages/SignIn";
import LandingPage from "./pages/LandingPage";
import WordCorrectionGame from "./pages/WordCorrect";
import SpellingSafari from "./pages/Spelling_Safari";
import RhymeTime from "./pages/RhymeTime";
import Dashboard from "./pages/Dashboard/Dash.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/spellingbee" element={<SpellingBee />} />
        <Route path="/letterpopup" element={<LetterPopup />} />
        <Route path="/spellingsafari" element={<SpellingSafari />} />
        <Route path="/rhymetime" element={<RhymeTime />} />
        <Route path="/cardflip" element={<CardFlip></CardFlip>}></Route>{" "}
        <Route
          path="/wordcorrect"
          element={<WordCorrectionGame></WordCorrectionGame>}
        ></Route>
        <Route path="signup" element={<Signup></Signup>}></Route>
        <Route path="signin" element={<Signin></Signin>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
