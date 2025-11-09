import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery/Gallery";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Gallery" element={<Gallery />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
