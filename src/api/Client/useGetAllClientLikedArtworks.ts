import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Artwork } from "../../types/Artwork";

export function useGetAllClientLikedArtworks(clientId: string) {
  return useQuery<Artwork[], Error>({
    queryKey: ["clientLikedArtworks", clientId],
    queryFn: async () => {
      const { data } = await axios.get<Artwork[]>(
        `${import.meta.env.VITE_BASE_URL}/Client/GetLikedArtworks?ClientId=${clientId}`
      );
      return data;
    },
    enabled: !!clientId,
  });
}
