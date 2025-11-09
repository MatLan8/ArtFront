import AddArt from "./pages/AddArt/AddArt";
import EditArt from "./pages/EditArt/EditArt";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<AddArt />} />
          <Route path="/edit-art" element={<EditArt />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
