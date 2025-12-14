import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetCartTotalSum = (clientId: string) => {
  return useQuery<number, Error>({
    queryKey: ["cartTotalSum", clientId],
    queryFn: async () => {
      const { data } = await axios.get<number>(
        `${
          import.meta.env.VITE_BASE_URL
        }/Cart/GetCartTotalSum?clientId=${clientId}`
      );
      return data;
    },
    enabled: !!clientId,
  });
};
