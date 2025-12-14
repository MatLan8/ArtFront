import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetAutomaticCartDiscount = (clientId: string) => {
  return useQuery<number, Error>({
    queryKey: ["cartAutomaticDiscount", clientId],
    queryFn: async () => {
      const { data } = await axios.get<number>(
        `${
          import.meta.env.VITE_BASE_URL
        }/Cart/GetAutomaticCartDiscount?ClientId=${clientId}`
      );
      return data;
    },
    enabled: !!clientId,
  });
};
