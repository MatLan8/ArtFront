import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export interface CouponUpdate {
  id: string;
  couponCode: string;
  description: string;
  discountAmount: number;
  beginAt: string;
  expireAt: string;
  isActive: boolean;
}

export const useUpdateDiscountCoupon = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, CouponUpdate>({
    mutationFn: async (packageC: CouponUpdate) => {
      const { data } = await axios.patch<void>(
        `${import.meta.env.VITE_BASE_URL}/DiscountCoupon/Update`,
        packageC
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getAllDiscountCoupons"] });
    },
  });
};
