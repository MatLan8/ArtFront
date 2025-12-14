import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";

export interface AddLikedArtworkRequest {
  clientId: string;
  artworkId: string;
}

export const useAddLikedArtwork = () => {
  return useMutation<boolean, AxiosError, AddLikedArtworkRequest>({
    mutationFn: async (payload) => {
      const { data } = await axios.post<boolean>(
        `${import.meta.env.VITE_BASE_URL}/Client/AddLikedArtwork`,
        payload
      );
      return data;
    },
  });
};
