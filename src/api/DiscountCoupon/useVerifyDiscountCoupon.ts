import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { DiscountCouponVerification } from "../../types/DiscountCouponVerification";

type VerifyDiscountCouponParams = {
  clientId: string;
  discountCode: string;
};

export const useVerifyDiscountCoupon = () => {
  return useMutation<
    DiscountCouponVerification,
    Error,
    VerifyDiscountCouponParams
  >({
    mutationFn: async ({ clientId, discountCode }) => {
      const { data } = await axios.get<DiscountCouponVerification>(
        `${import.meta.env.VITE_BASE_URL}/DiscountCoupon/Verify`,
        {
          params: { clientId, discountCode },
        }
      );
      return data;
    },
  });
};
