import SellerList from "./pages/SellerList/SellerList";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<SellerList />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
