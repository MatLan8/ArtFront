import { Routes, Route } from "react-router-dom";
import Gallery from "./pages/Gallery/Gallery";
import Home from "./pages/Home/Home";
import NavBar from "./components/NavBar/NavBar";
import AddArt from "./pages/AddArt/AddArt";
import EditArt from "./pages/EditArt/EditArt";
import SellerView from "./pages/SellerView/SellerView";
import Checkout from "./pages/Checkout/Checkout";
import ShoppingCart from "./pages/ShoppingCart/ShoppingCart";
import AdminPage from "./pages/Admin/AdminPage";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

function App() {
  return (
    <div>
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Gallery" element={<Gallery />} />
          <Route path="/Seller-view" element={<SellerView />} />
          <Route path="/Add-art" element={<AddArt />} />
          <Route path="/Edit-art" element={<EditArt />} />
          <Route path="/Checkout" element={<Checkout />} />
          <Route path="/Admin" element={<AdminPage />} />
          <Route path="/Cart" element={<ShoppingCart />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Login" element={<Login />} />

        </Routes>
      </main>
    </div>
  );
}

export default App;
