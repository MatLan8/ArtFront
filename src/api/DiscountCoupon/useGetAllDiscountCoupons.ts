import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { DiscountCoupon } from "../../types/DiscountCoupon";

export const useGetAllDiscountCoupons = () => {
  return useQuery<DiscountCoupon[], Error>({
    queryKey: ["getAllDiscountCoupons"],
    queryFn: async () => {
      const { data } = await axios.get<DiscountCoupon[]>(
        `${import.meta.env.VITE_BASE_URL}/DiscountCoupon/GetAll`
      );
      return data;
    },
  });
};
