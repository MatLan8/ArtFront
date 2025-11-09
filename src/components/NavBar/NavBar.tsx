import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { ShoppingBag } from "lucide-react";

function NavBar() {
  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/Gallery">Gallery</Link>
      <Link to="/Seller-view">Manage Art</Link>
      <Link to="/Login">Login</Link>
      <Link to="/Register">Register</Link>
      <Link to="/ShoppingCart">
        <ShoppingBag size={20} />
      </Link>
    </nav>
  );
}

export default NavBar;
