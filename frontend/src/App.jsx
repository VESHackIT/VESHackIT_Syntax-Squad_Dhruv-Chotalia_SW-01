import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LetterPopup from "./pages/LetterPopup";
import SpellingBee from "./pages/Spelling_Bee";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/spellingbee" element={<SpellingBee/>} />
        <Route path="/letterpopup" element={<LetterPopup />} />
      </Routes>
    </Router>
  );
}

export default App;
