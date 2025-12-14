import { useQuery } from "@tanstack/react-query";
import type { CartArtwork } from "../../types/CartArtwork";
import axios from "axios";

export const useGetAllCartArtworksByClientId = (clientId: string) => {
  return useQuery<CartArtwork[], Error>({
    queryKey: ["getAllCartArtworksByClientId", clientId],
    queryFn: async () => {
      const { data } = await axios.get<CartArtwork[]>(
        `${
          import.meta.env.VITE_BASE_URL
        }/Cart/GetByClientIdCartArtworks?ClientId=${clientId}`
      );
      return data;
    },
  });
};
