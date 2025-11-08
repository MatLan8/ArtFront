import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<ShoppingCart />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
