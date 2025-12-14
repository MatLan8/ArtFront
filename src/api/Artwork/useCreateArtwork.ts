import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export interface ArtworkCreate {
  name: string;
  author: string;
  description: string;
  price: number;
  dimensions: string;
  createdAt: Date;
  imageUrl: string;
  vendorId: string;
  style: number;
  material: number;
  technique: number;
  colorPalette: number;
  artType: number;
  period: number;
}

export const useCreateArtwork = () => {
  return useMutation<void, Error, ArtworkCreate>({
    mutationFn: async (packageC: ArtworkCreate) => {
      const { data } = await axios.post<void>(
        `${import.meta.env.VITE_BASE_URL}/Artwork/Create`,
        packageC
      );
      return data;
    },
  });
};
