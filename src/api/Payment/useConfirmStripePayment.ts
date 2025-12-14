import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useConfirmStripePayment = () => {
  return useMutation<void, Error, string>({
    mutationFn: async (sessionId) => {
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/Payment/ConfirmPayment`,
        sessionId,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
    },
  });
};
