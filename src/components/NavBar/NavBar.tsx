import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./NavBar.module.css";
import { ShoppingBag, LogOut } from "lucide-react";

function NavBar() {
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    setUserRole(sessionStorage.getItem("userRole"));

    const handleStorageChange = () => {
      setUserRole(sessionStorage.getItem("userRole"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    setUserRole(null);
    window.location.href = "/";
    sessionStorage.getItem("userId");
    sessionStorage.getItem("userRole");
  };

  return (
    <nav className={styles.nav}>
      <Link to="/">Home</Link>
      <Link to="/Gallery">Gallery</Link>
      {userRole === "Vendor" && <Link to="/Seller-view">Manage Art</Link>}

      <div className={styles.spacer} />
      {!userRole && <Link to="/Login">Login</Link>}
      {!userRole && <Link to="/Register">Register</Link>}
      {userRole === "Admin" && <Link to="/Admin">Admin</Link>}
      {userRole === "Client" && <Link to="/Profile">Profile</Link>}

      {userRole === "Client" && (
        <Link to="/Cart">
          <ShoppingBag size={20} />
        </Link>
      )}
      {userRole && (
        <button onClick={handleLogout} className={styles.logoutButton}>
          <LogOut size={20} />
        </button>
      )}
    </nav>
  );
}

export default NavBar;
