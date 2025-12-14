import { useQuery } from "@tanstack/react-query";
import type { Artwork } from "../../types/Artwork";
import axios from "axios";

export const useGetAllArtworks = () => {
  return useQuery<Artwork[], Error>({
    queryKey: ["getAllArtworks"],
    queryFn: async () => {
      const { data } = await axios.get<Artwork[]>(
        `${import.meta.env.VITE_BASE_URL}/Artwork/GetAll`
      );
      return data;
    },
  });
};
