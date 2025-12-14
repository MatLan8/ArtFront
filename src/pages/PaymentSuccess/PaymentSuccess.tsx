import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDeleteAllCartArtworks } from "../../api/Cart/useDeleteAllCartArtworks";
import { useConfirmStripePayment } from "../../api/Payment/useConfirmStripePayment";
import toast from "react-hot-toast";

function PaymentSuccess() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const clientId = sessionStorage.getItem("userId") || "";

  const confirmPayment = useConfirmStripePayment();
  const deleteAllCartArtworks = useDeleteAllCartArtworks(clientId);

  useEffect(() => {
    const sessionId = params.get("session_id");
    if (!sessionId) return;

    confirmPayment.mutate(sessionId, {
      onSuccess: () => {
        sessionStorage.removeItem("appliedCoupon");

        deleteAllCartArtworks.mutate(clientId, {
          onSuccess: () => {
            toast.success("Payment successful!");
            navigate("/gallery");
          },
        });
      },
      onError: () => {
        toast.error("Payment confirmation failed");
      },
    });
  }, [clientId, params]);

  return <p>Processing payment...</p>;
}

export default PaymentSuccess;
