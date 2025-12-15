import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CouponCreate {
  couponCode: string;
  description: string;
  discountAmount: number;
  beginAt: string;
  expireAt: string;
  startingPrice: number;
  isActive: boolean;
}

export const useCreateDiscountCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, CouponCreate>({
    mutationFn: async (couponc: CouponCreate) => {
      const { data } = await axios.post<void>(
        `${import.meta.env.VITE_BASE_URL}/DiscountCoupon/Create`,
        couponc
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllDiscountCoupons"] });
    },
  });
};
