import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export const useRemoveArtwork = () => {
  return useMutation<void, Error, string>({
    mutationFn: async (artworkId: string) => {
      const { data } = await axios.delete<void>(
        `${import.meta.env.VITE_BASE_URL}/Artwork/Remove`,
        {
          data: { artworkId },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    },
  });
};
