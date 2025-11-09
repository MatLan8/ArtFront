import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery/Gallery";
import Home from "./pages/Home/Home";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
  );
}

export default App;
