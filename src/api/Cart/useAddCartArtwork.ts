import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface CartArtworkCreate {
  clientId: string;
  artworkId: string;
  count: number;
  price: number;
}

export const useAddCartArtwork = () => {
  return useMutation<void, Error, CartArtworkCreate>({
    mutationFn: async (packageC: CartArtworkCreate) => {
      const { data } = await axios.post<void>(
        `${import.meta.env.VITE_BASE_URL}/Cart/AddCartArtwork`,
        packageC
      );
      return data;
    },
  });
};
