import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface OrderCreate {
  clientId: string;
  deliveryAddress: string;
  comment: string;
  deliveryMethod: number;
  discountCouponId?: string;
}

export const useCreateOrder = () => {
  return useMutation<string, Error, OrderCreate>({
    mutationFn: async (orderC: OrderCreate) => {
      const { data } = await axios.post<string>(
        `${import.meta.env.VITE_BASE_URL}/Order/Create`,
        orderC
      );
      return data;
    },
  });
};
