import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type CreateCheckoutSessionRequest = {
  clientId: string;
  orderId: string;
  couponId?: string;
};

export const useCreateCheckoutSession = () => {
  return useMutation<string, Error, CreateCheckoutSessionRequest>({
    mutationFn: async (payload) => {
      const { data } = await axios.post<string>(
        `${import.meta.env.VITE_BASE_URL}/Payment/CreateCheckoutSession`,
        payload
      );
      return data;
    },
  });
};
