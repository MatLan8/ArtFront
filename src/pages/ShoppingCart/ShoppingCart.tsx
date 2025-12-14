import { useEffect, useState } from "react";
import style from "./ShoppingCart.module.css";
import CartCard from "../../components/CartCard/CartCard";
import { useNavigate } from "react-router-dom";
import { useGetAllCartArtworksByClientId } from "../../api/Cart/useGetCartArtworksByClientId";
import { useGetCartTotalSum } from "../../api/Cart/useGetCartTotalSum";
import { useGetAutomaticCartDiscount } from "../../api/Cart/useGetAutomaticCartDiscount";
import { useVerifyDiscountCoupon } from "../../api/DiscountCoupon/useVerifyDiscountCoupon";
import type { DiscountCouponVerification } from "../../types/DiscountCouponVerification";

function ShoppingCart() {
  const navigate = useNavigate();
  const clientId = sessionStorage.getItem("userId") || "";

  // Cart data
  const { data: cartArtworks } = useGetAllCartArtworksByClientId(clientId);
  const { data: cartTotalSum = 0 } = useGetCartTotalSum(clientId);
  const { data: automaticDiscount = 0 } = useGetAutomaticCartDiscount(clientId);

  // Coupon state
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] =
    useState<DiscountCouponVerification | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(
    null
  );

  const verifyCouponMutation = useVerifyDiscountCoupon();

  // Automatic discount
  const autoDiscountPercentage = (automaticDiscount * 100).toFixed(0);
  const autoDiscountAmount = Number(
    (cartTotalSum * automaticDiscount).toFixed(2)
  );

  // Coupon discount
  const couponDiscountAmount =
    appliedCoupon?.isValid && appliedCoupon.discountValue
      ? Number((cartTotalSum * appliedCoupon.discountValue).toFixed(2))
      : 0;

  const couponPercentage = appliedCoupon?.discountValue
    ? (appliedCoupon.discountValue * 100).toFixed(0)
    : null;

  const estimatedTotal = Number(
    (cartTotalSum - autoDiscountAmount - couponDiscountAmount).toFixed(2)
  );

  // Apply coupon (NO race conditions)
  const handleApplyCoupon = () => {
    if (!couponInput) return;

    verifyCouponMutation.mutate(
      { clientId, discountCode: couponInput },
      {
        onSuccess: (result) => {
          if (result.isValid) {
            setAppliedCoupon(result);

            // ✅ SAVE TO SESSION STORAGE
            if (result.couponId) {
              sessionStorage.setItem(
                "appliedCoupon",
                JSON.stringify({
                  couponId: result.couponId,
                  discountValue: result.discountValue,
                })
              );
            }

            setMessage("Coupon applied");
            setMessageType("success");
          } else {
            sessionStorage.removeItem("appliedCoupon");

            setAppliedCoupon(null);
            setMessage(result.message ?? "Invalid coupon");
            setMessageType("error");
          }
        },
        onError: () => {
          sessionStorage.removeItem("appliedCoupon");
          setMessage("Something went wrong");
          setMessageType("error");
        },
      }
    );
  };

  // Auto-hide messages
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  const handleCheckout = () => {
    navigate("/Checkout");
  };

  return (
    <div className={style.Container}>
      <div className={style.Cart}>
        <p className={style.title}>Cart</p>
        <div className={style.divider} />

        {cartArtworks?.map((artwork) => (
          <CartCard key={artwork.id} artwork={artwork} />
        ))}
      </div>

      <div className={style.PriceSummary}>
        <p className={style.title}>Order summary</p>
        <div className={style.divider} />

        <div className={style.priceRow}>
          <span className={style.text}>Cart subtotal</span>
          <span className={style.price}>{cartTotalSum.toFixed(2)} €</span>
        </div>

        {automaticDiscount > 0 && (
          <div className={style.priceRow}>
            <span className={style.text}>
              Automatic discount ({autoDiscountPercentage}%)
            </span>
            <span className={style.price}>
              −{autoDiscountAmount.toFixed(2)} €
            </span>
          </div>
        )}

        {appliedCoupon?.isValid && (
          <div className={style.priceRow}>
            <span className={style.text}>
              Discount coupon ({couponPercentage}%)
            </span>
            <span className={style.price}>
              −{couponDiscountAmount.toFixed(2)} €
            </span>
          </div>
        )}

        <div className={`${style.priceRow} ${style.totalRow}`}>
          <span className={style.text}>Estimated total</span>
          <span className={style.price}>{estimatedTotal.toFixed(2)} €</span>
        </div>

        <div className={style.divider} />

        <span className={style.text} style={{ fontSize: "16px" }}>
          APPLY PROMO CODE
        </span>

        <div className={style.Promo}>
          <input
            type="text"
            placeholder="Enter promo code"
            className={style.input}
            value={couponInput}
            onChange={(e) => setCouponInput(e.target.value)}
          />
          <button
            className={style.ApplyButton}
            onClick={handleApplyCoupon}
            disabled={verifyCouponMutation.status === "pending"}
          >
            Apply
          </button>
        </div>

        {message && (
          <div
            className={
              messageType === "success"
                ? style.successMessage
                : style.errorMessage
            }
          >
            {message}
          </div>
        )}

        <button className={style.CheckoutButton} onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
