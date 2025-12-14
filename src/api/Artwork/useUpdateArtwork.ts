import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { Artwork } from "../../types/Artwork";

export const useUpdateArtwork = () => {
  return useMutation<void, Error, Artwork>({
    mutationFn: async (packageC: Artwork) => {
      const { data } = await axios.patch<void>(
        `${import.meta.env.VITE_BASE_URL}/Artwork/Update`,
        packageC
      );
      return data;
    },
  });
};
