import React from "react";
import styles from "./ShoppingCart.module.css";
import { artworks } from "../../MockUpData/ArtworkMock";
import CartCard from "../../components/CartCard/CartCard";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/checkout"); // path to your checkout page
  };
  return (
    <div className={styles.Container}>
      <div className={styles.Cart}>
        <p className={styles.title}>Cart</p>
        <div className={styles.divider} />
        <CartCard artwork={artworks[0]} />
        <CartCard artwork={artworks[1]} />
        <CartCard artwork={artworks[2]} />
      </div>
      <div className={styles.PriceSummary}>
        <p className={styles.title}>Order summary</p>
        <div className={styles.divider} />
        <span className={styles.text}>Estimated total: 152464 €</span>
        <span className={styles.text} style={{ fontSize: "16px" }}>
          APPLY PROMO CODE
        </span>
        <div className={styles.Promo}>
          <input
            type="text"
            placeholder="Enter promo code"
            className={styles.input}
          />
          <button className={styles.ApplyButton}>Apply</button>
        </div>
        <button className={styles.CheckoutButton} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
