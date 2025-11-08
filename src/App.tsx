import "./App.css";
import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery/Gallery";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
  );
}

export default App;
