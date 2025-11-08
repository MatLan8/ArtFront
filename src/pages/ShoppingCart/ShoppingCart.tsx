import React from "react";
import styles from "./ShoppingCart.module.css";
import { artworks } from "../../MockUpData/ArtworkMock";
import CartCard from "../../components/CartCard/CartCard";

function ShoppingCart() {
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
        <p>balls</p>
      </div>
    </div>
  );
}

export default ShoppingCart;
