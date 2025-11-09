import React from "react";
import style from "./ShoppingCart.module.css";
import { artworks } from "../../MockUpData/ArtworkMock";
import CartCard from "../../components/CartCard/CartCard";
import { useNavigate } from "react-router-dom";

function ShoppingCart() {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate("/Checkout");
  };
  return (
    <div className={style.Container}>
      <div className={style.Cart}>
        <p className={style.title}>Cart</p>
        <div className={style.divider} />
        <CartCard artwork={artworks[0]} />
        <CartCard artwork={artworks[1]} />
        <CartCard artwork={artworks[2]} />
      </div>
      <div className={style.PriceSummary}>
        <p className={style.title}>Order summary</p>
        <div className={style.divider} />
        <span className={style.text}>Estimated total: 152464 €</span>
        <span className={style.text} style={{ fontSize: "16px" }}>
          APPLY PROMO CODE
        </span>
        <div className={style.Promo}>
          <input
            type="text"
            placeholder="Enter promo code"
            className={style.input}
          />
          <button className={style.ApplyButton}>Apply</button>
        </div>
        <button className={style.CheckoutButton} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
