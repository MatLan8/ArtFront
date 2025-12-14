import React, { useState } from "react";
import { Undo2 } from "lucide-react";
import style from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import { useCreateOrder } from "../../api/Order/useCreateOrder";
import { useCreateCheckoutSession } from "../../api/Payment/useCreateCheckoutSession";
import toast from "react-hot-toast";

function Checkout() {
  const navigate = useNavigate();
  const clientId = sessionStorage.getItem("userId") || "";
  const storedCoupon = sessionStorage.getItem("appliedCoupon");

  const couponId = storedCoupon ? JSON.parse(storedCoupon).couponId : undefined;

  const [shippingMethod, setShippingMethod] = useState<"ship" | "pickup">(
    "ship"
  );
  const [selectedStore, setSelectedStore] = useState(1);
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");

  const createOrderMutation = useCreateOrder();
  const createCheckoutSession = useCreateCheckoutSession();

  const stores = [
    { id: 1, name: "Store A", address: "123 Main St, New York" },
    { id: 2, name: "Store B", address: "456 Broadway Ave, Los Angeles" },
    { id: 3, name: "Store C", address: "789 Market Rd, Chicago" },
  ];

  const isShipAddressInvalid = shippingMethod === "ship" && !address.trim();

  const handleCheckout = () => {
    if (!clientId || isShipAddressInvalid) return;

    const deliveryAddress =
      shippingMethod === "ship"
        ? address
        : stores.find((s) => s.id === selectedStore)?.address || "";

    createOrderMutation.mutate(
      {
        clientId,
        deliveryAddress,
        comment,
        deliveryMethod: shippingMethod === "ship" ? 0 : 1,
        discountCouponId: couponId,
      },
      {
        onSuccess: (orderId) => {
          toast.success("Order created successfully");
          createCheckoutSession.mutate(
            {
              clientId,
              orderId,
              couponId,
            },
            {
              onSuccess: (checkoutUrl) => {
                window.location.href = checkoutUrl;
              },
              onError: () => {
                toast.error("Failed to start payment");
              },
            }
          );
        },
        onError: (error) => {
          toast.error(error.message || "Failed to create order");
        },
      }
    );
  };

  const handleBack = () => {
    navigate("/Cart");
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
          <input
            type="text"
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {isShipAddressInvalid && (
            <span style={{ color: "red", fontSize: "14px" }}>
              Delivery address is required
            </span>
          )}
        </div>
      )}

      <div className={style.commentSection}>
        <textarea
          placeholder="Comment (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button
        className={style.PaymentButton}
        onClick={handleCheckout}
        disabled={
          createOrderMutation.status === "pending" || isShipAddressInvalid
        }
      >
        Continue to Payment
      </button>
    </div>
  );
}

export default Checkout;
