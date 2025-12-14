import { useQuery } from "@tanstack/react-query";
import type { Artwork } from "../../types/Artwork";
import axios from "axios";

export const useGetAllArtworksByVendorId = (vendorId: string) => {
  return useQuery<Artwork[], Error>({
    queryKey: ["getAllArtworksByVendorId", vendorId],
    queryFn: async () => {
      const { data } = await axios.get<Artwork[]>(
        `${
          import.meta.env.VITE_BASE_URL
        }/Artwork/GetAllByVendorId?VendorId=${vendorId}`
      );
      return data;
    },
  });
};
