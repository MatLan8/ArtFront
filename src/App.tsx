import AddArt from "./pages/AddArt/AddArt";
import EditArt from "./pages/EditArt/EditArt";
import { Routes, Route } from "react-router-dom";
import SellerList from "./pages/SellerList/SellerList";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<SellerList />} />
          <Route path="/add-art" element={<AddArt />} />
          <Route path="/edit-art" element={<EditArt />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
