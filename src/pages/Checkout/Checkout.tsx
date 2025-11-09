import React, { useState } from "react";
import { Undo2 } from "lucide-react";
import style from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [shippingMethod, setShippingMethod] = useState("ship");
  const [selectedStore, setSelectedStore] = useState(1);
  const navigate = useNavigate();

  const stores = [
    { id: 1, name: "Store A", address: "123 Main St, New York" },
    { id: 2, name: "Store B", address: "456 Broadway Ave, Los Angeles" },
    { id: 3, name: "Store C", address: "789 Market Rd, Chicago" },
  ];

  const countries = [
    "United States",
    "Canada",
    "United Kingdom",
    "Germany",
    "France",
    "Australia",
    "Japan",
    "India",
    "Brazil",
    "Mexico",
    "Italy",
    "Spain",
  ];

  const handleCheckout = () => {};
  const handleBack = () => {
    navigate("/cart");
  };
  return (
    <div className={style.Container}>
      <div className={style.titleContainer}>
        <span className={style.title}>Checkout</span>
        <button className={style.backButton} onClick={handleBack}>
          Back to Cart
          <Undo2 size={16} />
        </button>
      </div>

      <div className={style.divider} />

      <p className={style.subtitle}>Shipping Method</p>

      <div className={style.radioGroup}>
        <label>
          <input
            type="radio"
            name="shipping"
            value="ship"
            checked={shippingMethod === "ship"}
            onChange={() => setShippingMethod("ship")}
          />
          Ship to Address
        </label>

        <label>
          <input
            type="radio"
            name="shipping"
            value="pickup"
            checked={shippingMethod === "pickup"}
            onChange={() => setShippingMethod("pickup")}
          />
          Pick Up at Store
        </label>
      </div>

      {shippingMethod === "pickup" && (
        <div className={style.pickup}>
          <label>
            Select Store:
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(Number(e.target.value))}
            >
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name} — {store.address}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      {shippingMethod === "ship" && (
        <div className={style.shipForm}>
          <div className={style.row}>
            <input type="text" placeholder="First Name" />
            <input type="text" placeholder="Last Name" />
          </div>

          <input type="text" placeholder="Address" />

          <div className={style.row}>
            <select>
              <option value="">Select Country</option>
              {countries.map((country, idx) => (
                <option key={idx} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <input type="text" placeholder="City" />
          </div>

          <div className={style.row}>
            <input type="text" placeholder="ZIP Code" />
            <input type="text" placeholder="Phone Number" />
          </div>
        </div>
      )}
      <button className={style.PaymentButton} onClick={handleCheckout}>
        Continue to Payment
      </button>
    </div>
  );
}

export default Checkout;
