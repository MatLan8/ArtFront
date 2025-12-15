import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { ArtworkWithFlag, Artwork } from "../../types/Artwork";

export function useGetAllArtworksWithRecommendations(clientId: string) {
  return useQuery<ArtworkWithFlag[], Error>({
    queryKey: ["allArtworksWithRecommendations", clientId],
    queryFn: async () => {
      const { data: allArtworks } = await axios.get<Artwork[]>(`${import.meta.env.VITE_BASE_URL}/Artwork/GetAll`);
      const { data: recommended } = await axios.get<Artwork[]>(`${import.meta.env.VITE_BASE_URL}/Client/GetRecommendedArtworks?ClientId=${clientId}`);

      const recommendedIds = new Set(recommended.map((a) => a.id));
      const allArtworksWithFlag: ArtworkWithFlag[] = allArtworks.map((a) => ({
        ...a,
        recommended: recommendedIds.has(a.id),
      }));

      allArtworksWithFlag.sort((a, b) => (Number(b.recommended) - Number(a.recommended)));
      return allArtworksWithFlag;
    },
    enabled: !!clientId,
  });
}
