import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Artwork } from "../../types/Artwork";

export const useGetArtworkById = (id: string) => {
  return useQuery<Artwork, Error>({
    queryKey: ["artwork", id],
    queryFn: async () => {
      const { data } = await axios.get<Artwork>(
        `${import.meta.env.VITE_BASE_URL}/Artwork/GetById`,
        { params: { id } }
      );
      return data;
    },
    enabled: !!id, 
  });
};
